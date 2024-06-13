import { Request, Response } from "express";
import * as XLSX from "xlsx";
import {
	NotaFiscal,
	Emissor,
	PrismaClient,
	Destinatario,
} from "@prisma/client";

const prisma = new PrismaClient();

export class WorksheetControllers {
	async getStatus(request: Request, response: Response) {
		return response.json({ message: "Funcionando" });
	}

	async uploadSpreadsheetData(request: Request, response: Response) {
		const file = request.file;
		const buffer = file?.buffer;

		if (!file) {
			return response
				.status(400)
				.json({ error: "Planilha não fornecida" });
		}

		const workbook = XLSX.read(buffer, { type: "array" });
		const sheetName = workbook.SheetNames[0];
		const worksheet = workbook.Sheets[sheetName];

		if (!worksheet["!ref"]) {
			worksheet["!ref"] = "A1:Z1"; // Ajuste este intervalo conforme necessário
		}

		const range = XLSX.utils.decode_range(worksheet["!ref"]);
		range.s.r = 7;
		worksheet["!ref"] = XLSX.utils.encode_range(range);
		const json: any[][] = XLSX.utils.sheet_to_json(worksheet, {
			header: 1,
		});

		const result = await prisma.$transaction(
			async (tx) => {
				const items = [];
				for (let i = 0; i < json.length; i++) {
					const notaFiscal = await prisma.notaFiscal.create({
						data: {
							dataEmissao: json[i][0] ?? null,
							serie: json[i][1] ? String(json[i][1]) : "0",
							numeroNotaFiscal: json[i][2]
								? String(json[i][2])
								: "0",
							chaveAcesso: json[i][3] ? String(json[i][3]) : "0",
							naturezaOperacao: json[i][4]
								? String(json[i][4])
								: "",
							tipoEmissao: json[i][5] ? String(json[i][5]) : "",
							numProtocolo: json[i][6] ? String(json[i][6]) : "0",
							dataAutorizacao: json[i][7]
								? String(json[i][7])
								: "0",
							situacao: json[i][8] ? String(json[i][8]) : "",
							valorTotalBaseCalculo: json[i][18] ?? null,
							valorTotalIcms: json[i][19] ?? null,
							valorTotalBcSt: json[i][20] ?? null,
							valorTotalIcmsSt: json[i][21] ?? null,
							valorTotalProduto: json[i][22] ?? null,
							valorTotalFrete: json[i][23] ?? null,
							valorTotalNotaFiscal: json[i][24] ?? null,
							valorTotalServico: json[i][25] ?? null,
							destinatario: {
								create: {
									cnpjCpf: json[i][14] ?? "",
									nomeRazaoSocial: json[i][15] ?? "",
									inscricaoEstadual: json[i][16] ?? "",
									uf: json[i][17] ?? "",
								},
							},
							emissor: {
								create: {
									cnpjCpf: json[i][9] ?? "",
									nomeRazaoSocial: json[i][10] ?? "",
									inscricaoEstadual: json[i][11] ?? "",
									nomeFantasia: json[i][12] ?? "",
									uf: json[i][13] ?? "",
								},
							},
						},
					});
					console.log(notaFiscal);

					items.push(notaFiscal);
				}

				return items;
			},
			{
				timeout: 30000,
			}
		);

		console.log(result);
		// // console.log(items[1].destinatarioId);
		// await prisma.notaFiscal.createMany({ data: items });
		return response.json(result);
	}

	async getSpreadsheetData(request: Request, response: Response) {
		try {
			const data = await prisma.notaFiscal.findMany({
				include: {
					emissor: true,
					destinatario: true,
				},
			});
			return response.json(data);
		} catch (error) {
			console.error(error);
			return response.status(500).json({ error: "Erro ao buscar dados" });
		}
	}

	async deleteAllData(request: Request, response: Response) {
		try {
			// Excluir todos os registros da tabela notaFiscal
			await prisma.notaFiscal.deleteMany();
			await prisma.emissor.deleteMany();
			await prisma.destinatario.deleteMany();

			return response.json({
				message: "Todos os registros excluídos com sucesso",
			});
		} catch (error) {
			console.error(error);
			return response
				.status(500)
				.json({ error: "Erro ao excluir registros" });
		}
	}
}

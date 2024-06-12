import { Request, Response } from "express";
import * as XLSX from "xlsx";
import { PrismaClient } from "@prisma/client";

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

		try {
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
			const dataToSave = json
				.map((row) => ({
					dataEmissao: row[0] || null,
					serie: row[1] ? String(row[1]) : "0",
					numeroNotaFiscal: row[2] ? String(row[2]) : "0",
					chaveAcesso: row[3] || null,
					naturezaOperacao: row[4] || null,
					tipoEmissao: row[5] || null,
					numProtocolo: row[6] || null,
					dataAutorizacao: row[7] || null,
					situacao: row[8] || null,
					emissor: {
						create: {
							cnpjCpf: row[9] || null,
							nomeRazaoSocial: row[10] || null,
							inscricaoEstadual: row[11] || null,
							nomeFantasia: row[12] || null,
							uf: row[13] || null,
						},
					},
					destinatario: {
						create: {
							cnpjCpf: row[14] || null,
							nomeRazaoSocial: row[16] || null,
							inscricaoEstadual: row[15] || null,
							uf: row[17] || null,
						},
					},
					valorTotalBaseCalculo: row[18] ? row[18] : "0",
					valorTotalIcms: row[19] ? row[19] : "0",
					valorTotalBcSt: row[20] ? row[20] : "0",
					valorTotalIcmsSt: row[21] ? row[21] : "0",
					valorTotalProduto: row[22] ? row[22] : "0",
					valorTotalFrete: row[23] ? row[23] : "0",
					valorTotalNotaFiscal: row[24] ? row[24] : "0",
					valorTotalServico: row[25] ? row[25] : "0",
				}))
				.filter(
					(data) =>
						data.numeroNotaFiscal &&
						data.chaveAcesso &&
						Object.values(data).some(
							(value) =>
								value !== null && value !== 0 && value !== ""
						)
				);

			for (const data of dataToSave) {
				await prisma.notaFiscal.create({
					data: {
						dataEmissao: data.dataEmissao,
						serie: data.serie,
						numeroNotaFiscal: data.numeroNotaFiscal,
						chaveAcesso: data.chaveAcesso,
						naturezaOperacao: data.naturezaOperacao,
						tipoEmissao: data.tipoEmissao,
						numProtocolo: data.numProtocolo,
						dataAutorizacao: data.dataAutorizacao,
						situacao: data.situacao,
						valorTotalBaseCalculo: data.valorTotalBaseCalculo,
						valorTotalIcms: data.valorTotalIcms,
						valorTotalBcSt: data.valorTotalBcSt,
						valorTotalIcmsSt: data.valorTotalIcmsSt,
						valorTotalProduto: data.valorTotalProduto,
						valorTotalFrete: data.valorTotalFrete,
						valorTotalNotaFiscal: data.valorTotalNotaFiscal,
						valorTotalServico: data.valorTotalServico,
						emissor: {
							create: data.emissor.create,
						},
						destinatario: {
							create: data.destinatario.create,
						},
					},
				});
			}

			return response.json({
				message: "Dados salvos com sucesso",
				data: dataToSave,
			});
		} catch (error) {
			console.error(error);
			return response
				.status(500)
				.json({ error: "Erro ao processar planilha" });
		}
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
}

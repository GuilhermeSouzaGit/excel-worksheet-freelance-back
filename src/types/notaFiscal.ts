export interface NotaFiscal {
	dataEmissao: string;
	serie: string;
	numeroNotaFiscal: string;
	chaveAcesso: string;
	naturezaOperacao: string;
	tipoEmissao: string;
	numProtocolo: string;
	dataAutorizacao: string;
	situacao: string;
	emissor: {
		cnpjCpf: string;
		nomeRazaoSocial: string;
		inscricaoEstadual: string;
		nomeFantasia: string;
		uf: string;
	};
	destinatario: {
		cnpjCpf: string;
		nomeRazaoSocial: string;
		inscricaoEstadual: string;
		uf: string;
	};
	valorTotalBaseCalculo: string;
	valorTotalIcms: string;
	valorTotalBcSt: string;
	valorTotalIcmsSt: string;
	valorTotalProduto: string;
	valorTotalFrete: string;
	valorTotalNotaFiscal: string;
	valorTotalServico: string;
}

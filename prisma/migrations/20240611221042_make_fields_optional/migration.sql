-- DropForeignKey
ALTER TABLE "NotaFiscal" DROP CONSTRAINT "NotaFiscal_destinatarioId_fkey";

-- DropForeignKey
ALTER TABLE "NotaFiscal" DROP CONSTRAINT "NotaFiscal_emissorId_fkey";

-- AlterTable
ALTER TABLE "Destinatario" ALTER COLUMN "cnpjCpf" DROP NOT NULL,
ALTER COLUMN "nomeRazaoSocial" DROP NOT NULL,
ALTER COLUMN "uf" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Emissor" ALTER COLUMN "cnpjCpf" DROP NOT NULL,
ALTER COLUMN "nomeRazaoSocial" DROP NOT NULL,
ALTER COLUMN "uf" DROP NOT NULL;

-- AlterTable
ALTER TABLE "NotaFiscal" ALTER COLUMN "dataEmissao" DROP NOT NULL,
ALTER COLUMN "serie" DROP NOT NULL,
ALTER COLUMN "numeroNotaFiscal" DROP NOT NULL,
ALTER COLUMN "chaveAcesso" DROP NOT NULL,
ALTER COLUMN "naturezaOperacao" DROP NOT NULL,
ALTER COLUMN "tipoEmissao" DROP NOT NULL,
ALTER COLUMN "numProtocolo" DROP NOT NULL,
ALTER COLUMN "dataAutorizacao" DROP NOT NULL,
ALTER COLUMN "situacao" DROP NOT NULL,
ALTER COLUMN "valorTotalBaseCalculo" DROP NOT NULL,
ALTER COLUMN "valorTotalIcms" DROP NOT NULL,
ALTER COLUMN "valorTotalBcSt" DROP NOT NULL,
ALTER COLUMN "valorTotalIcmsSt" DROP NOT NULL,
ALTER COLUMN "valorTotalProduto" DROP NOT NULL,
ALTER COLUMN "valorTotalFrete" DROP NOT NULL,
ALTER COLUMN "valorTotalNotaFiscal" DROP NOT NULL,
ALTER COLUMN "valorTotalServico" DROP NOT NULL,
ALTER COLUMN "emissorId" DROP NOT NULL,
ALTER COLUMN "destinatarioId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "NotaFiscal" ADD CONSTRAINT "NotaFiscal_emissorId_fkey" FOREIGN KEY ("emissorId") REFERENCES "Emissor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotaFiscal" ADD CONSTRAINT "NotaFiscal_destinatarioId_fkey" FOREIGN KEY ("destinatarioId") REFERENCES "Destinatario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

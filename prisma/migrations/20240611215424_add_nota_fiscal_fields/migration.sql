/*
  Warnings:

  - Added the required column `cnpjCpf` to the `Destinatario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nomeRazaoSocial` to the `Destinatario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uf` to the `Destinatario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Destinatario" ADD COLUMN     "cnpjCpf" TEXT NOT NULL,
ADD COLUMN     "inscricaoEstadual" TEXT,
ADD COLUMN     "nomeRazaoSocial" TEXT NOT NULL,
ADD COLUMN     "uf" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "NotaFiscal" (
    "id" SERIAL NOT NULL,
    "dataEmissao" TIMESTAMP(3) NOT NULL,
    "serie" TEXT NOT NULL,
    "numeroNotaFiscal" TEXT NOT NULL,
    "chaveAcesso" TEXT NOT NULL,
    "naturezaOperacao" TEXT NOT NULL,
    "tipoEmissao" TEXT NOT NULL,
    "numProtocolo" TEXT NOT NULL,
    "dataAutorizacao" TIMESTAMP(3) NOT NULL,
    "situacao" TEXT NOT NULL,
    "valorTotalBaseCalculo" DOUBLE PRECISION NOT NULL,
    "valorTotalIcms" DOUBLE PRECISION NOT NULL,
    "valorTotalBcSt" DOUBLE PRECISION NOT NULL,
    "valorTotalIcmsSt" DOUBLE PRECISION NOT NULL,
    "valorTotalProduto" DOUBLE PRECISION NOT NULL,
    "valorTotalFrete" DOUBLE PRECISION NOT NULL,
    "valorTotalNotaFiscal" DOUBLE PRECISION NOT NULL,
    "valorTotalServico" DOUBLE PRECISION NOT NULL,
    "emissorId" INTEGER NOT NULL,
    "destinatarioId" INTEGER NOT NULL,

    CONSTRAINT "NotaFiscal_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "NotaFiscal" ADD CONSTRAINT "NotaFiscal_emissorId_fkey" FOREIGN KEY ("emissorId") REFERENCES "Emissor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotaFiscal" ADD CONSTRAINT "NotaFiscal_destinatarioId_fkey" FOREIGN KEY ("destinatarioId") REFERENCES "Destinatario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - The `serie` column on the `NotaFiscal` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "NotaFiscal" DROP COLUMN "serie",
ADD COLUMN     "serie" INTEGER;

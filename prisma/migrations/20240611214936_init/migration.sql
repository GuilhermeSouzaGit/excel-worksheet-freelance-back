-- CreateTable
CREATE TABLE "Emissor" (
    "id" SERIAL NOT NULL,
    "cnpjCpf" TEXT NOT NULL,
    "nomeRazaoSocial" TEXT NOT NULL,
    "inscricaoEstadual" TEXT,
    "nomeFantasia" TEXT,
    "uf" TEXT NOT NULL,

    CONSTRAINT "Emissor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Destinatario" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Destinatario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE `Aeronaves` (
    `id` VARCHAR(191) NOT NULL,
    `modelo` VARCHAR(191) NOT NULL,
    `capacidade` INTEGER NOT NULL,
    `alcance` INTEGER NOT NULL,
    `tipo` ENUM('COMERCIAL', 'MILITAR') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Etapas` (
    `nome` VARCHAR(191) NOT NULL,
    `prazo` DATETIME(3) NOT NULL,
    `status` ENUM('PENDENTE', 'ANDAMENTO', 'CONCLUIDA') NOT NULL,
    `aeronave_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`nome`, `aeronave_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pecas` (
    `nome` VARCHAR(191) NOT NULL,
    `tipo` ENUM('NACIONAL', 'IMPORTADA') NOT NULL,
    `fornecedor` VARCHAR(191) NOT NULL,
    `status` ENUM('EM_PRODUCAO', 'EM_TRANSPORTE', 'PRONTA') NOT NULL,
    `aeronave_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`nome`, `aeronave_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Testes` (
    `tipo` ENUM('ELETRICO', 'HIDRAULICO', 'AERODINAMICO') NOT NULL,
    `resultado` ENUM('APROVADO', 'REPROVADO') NOT NULL,
    `aeronave_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`tipo`, `aeronave_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Etapas` ADD CONSTRAINT `Etapas_aeronave_id_fkey` FOREIGN KEY (`aeronave_id`) REFERENCES `Aeronaves`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pecas` ADD CONSTRAINT `Pecas_aeronave_id_fkey` FOREIGN KEY (`aeronave_id`) REFERENCES `Aeronaves`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Testes` ADD CONSTRAINT `Testes_aeronave_id_fkey` FOREIGN KEY (`aeronave_id`) REFERENCES `Aeronaves`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

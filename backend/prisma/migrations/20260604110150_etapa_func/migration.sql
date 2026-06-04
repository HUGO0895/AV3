-- CreateTable
CREATE TABLE `FuncEtapa` (
    `funcionario_id` INTEGER NOT NULL,
    `etapa_nome` VARCHAR(191) NOT NULL,
    `etapa_aeronave_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`funcionario_id`, `etapa_nome`, `etapa_aeronave_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `FuncEtapa` ADD CONSTRAINT `FuncEtapa_funcionario_id_fkey` FOREIGN KEY (`funcionario_id`) REFERENCES `Funcionario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FuncEtapa` ADD CONSTRAINT `FuncEtapa_etapa_nome_etapa_aeronave_id_fkey` FOREIGN KEY (`etapa_nome`, `etapa_aeronave_id`) REFERENCES `Etapas`(`nome`, `aeronave_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

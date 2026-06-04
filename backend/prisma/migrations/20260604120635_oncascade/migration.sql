-- DropForeignKey
ALTER TABLE `FuncEtapa` DROP FOREIGN KEY `FuncEtapa_etapa_nome_etapa_aeronave_id_fkey`;

-- DropForeignKey
ALTER TABLE `FuncEtapa` DROP FOREIGN KEY `FuncEtapa_funcionario_id_fkey`;

-- DropIndex
DROP INDEX `FuncEtapa_etapa_nome_etapa_aeronave_id_fkey` ON `FuncEtapa`;

-- AddForeignKey
ALTER TABLE `FuncEtapa` ADD CONSTRAINT `FuncEtapa_funcionario_id_fkey` FOREIGN KEY (`funcionario_id`) REFERENCES `Funcionario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FuncEtapa` ADD CONSTRAINT `FuncEtapa_etapa_nome_etapa_aeronave_id_fkey` FOREIGN KEY (`etapa_nome`, `etapa_aeronave_id`) REFERENCES `Etapas`(`nome`, `aeronave_id`) ON DELETE CASCADE ON UPDATE CASCADE;

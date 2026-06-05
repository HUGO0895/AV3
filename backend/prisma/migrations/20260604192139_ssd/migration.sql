-- DropForeignKey
ALTER TABLE `Etapas` DROP FOREIGN KEY `Etapas_aeronave_id_fkey`;

-- DropForeignKey
ALTER TABLE `Testes` DROP FOREIGN KEY `Testes_aeronave_id_fkey`;

-- DropIndex
DROP INDEX `Etapas_aeronave_id_fkey` ON `Etapas`;

-- DropIndex
DROP INDEX `Testes_aeronave_id_fkey` ON `Testes`;

-- AddForeignKey
ALTER TABLE `Etapas` ADD CONSTRAINT `Etapas_aeronave_id_fkey` FOREIGN KEY (`aeronave_id`) REFERENCES `Aeronaves`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Testes` ADD CONSTRAINT `Testes_aeronave_id_fkey` FOREIGN KEY (`aeronave_id`) REFERENCES `Aeronaves`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

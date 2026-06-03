/*
  Warnings:

  - You are about to drop the column `nivelPermisssao` on the `Funcionario` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[telefone]` on the table `Funcionario` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nivelPermissao` to the `Funcionario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Funcionario` DROP COLUMN `nivelPermisssao`,
    ADD COLUMN `nivelPermissao` ENUM('ADMINISTRADOR', 'OPERADOR', 'ENGENHEIRO') NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Funcionario_telefone_key` ON `Funcionario`(`telefone`);

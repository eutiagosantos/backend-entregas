/*
  Warnings:

  - You are about to drop the column `pasword` on the `clients` table. All the data in the column will be lost.
  - Added the required column `password` to the `clients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `clients` DROP COLUMN `pasword`,
    ADD COLUMN `password` VARCHAR(191) NOT NULL;

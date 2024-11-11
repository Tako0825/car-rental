/*
  Warnings:

  - You are about to drop the column `userId` on the `payment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `payment` DROP FOREIGN KEY `Payment_userId_fkey`;

-- AlterTable
ALTER TABLE `payment` DROP COLUMN `userId`;

/*
  Warnings:

  - You are about to drop the column `batteryLevel` on the `car` table. All the data in the column will be lost.
  - You are about to drop the column `licensePlate` on the `car` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `car` table. All the data in the column will be lost.
  - You are about to drop the column `pricePerDay` on the `car` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `car` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `car` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `car` table. All the data in the column will be lost.
  - You are about to drop the column `carId` on the `carmaintenance` table. All the data in the column will be lost.
  - You are about to drop the column `carId` on the `feedback` table. All the data in the column will be lost.
  - You are about to drop the column `carId` on the `rental` table. All the data in the column will be lost.
  - Added the required column `carListingId` to the `CarMaintenance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `carListingId` to the `Feedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `carListingId` to the `Rental` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `car` DROP FOREIGN KEY `Car_userId_fkey`;

-- DropForeignKey
ALTER TABLE `carmaintenance` DROP FOREIGN KEY `CarMaintenance_carId_fkey`;

-- DropForeignKey
ALTER TABLE `feedback` DROP FOREIGN KEY `Feedback_carId_fkey`;

-- DropForeignKey
ALTER TABLE `rental` DROP FOREIGN KEY `Rental_carId_fkey`;

-- DropIndex
DROP INDEX `Car_licensePlate_key` ON `car`;

-- AlterTable
ALTER TABLE `car` DROP COLUMN `batteryLevel`,
    DROP COLUMN `licensePlate`,
    DROP COLUMN `location`,
    DROP COLUMN `pricePerDay`,
    DROP COLUMN `status`,
    DROP COLUMN `userId`,
    DROP COLUMN `year`,
    ADD COLUMN `cover` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `carmaintenance` DROP COLUMN `carId`,
    ADD COLUMN `carListingId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `feedback` DROP COLUMN `carId`,
    ADD COLUMN `carListingId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `rental` DROP COLUMN `carId`,
    ADD COLUMN `carListingId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `avatar` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `CarListing` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NULL,
    `carId` INTEGER NULL,
    `licensePlate` VARCHAR(191) NOT NULL,
    `year` INTEGER NOT NULL,
    `status` ENUM('available', 'rented', 'maintenance') NOT NULL,
    `batteryLevel` INTEGER NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `pricePerDay` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `CarListing_licensePlate_key`(`licensePlate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CarListing` ADD CONSTRAINT `CarListing_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CarListing` ADD CONSTRAINT `CarListing_carId_fkey` FOREIGN KEY (`carId`) REFERENCES `Car`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rental` ADD CONSTRAINT `Rental_carListingId_fkey` FOREIGN KEY (`carListingId`) REFERENCES `CarListing`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CarMaintenance` ADD CONSTRAINT `CarMaintenance_carListingId_fkey` FOREIGN KEY (`carListingId`) REFERENCES `CarListing`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Feedback` ADD CONSTRAINT `Feedback_carListingId_fkey` FOREIGN KEY (`carListingId`) REFERENCES `CarListing`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

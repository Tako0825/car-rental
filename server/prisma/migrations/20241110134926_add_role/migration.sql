-- AlterTable
ALTER TABLE `user` ADD COLUMN `role` ENUM('USER', 'ADMIN', 'CAR_MANAGER') NOT NULL DEFAULT 'USER';

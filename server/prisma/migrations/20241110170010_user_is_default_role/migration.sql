-- AlterTable
ALTER TABLE `user` MODIFY `role` ENUM('user', 'admin', 'manager') NOT NULL DEFAULT 'user';

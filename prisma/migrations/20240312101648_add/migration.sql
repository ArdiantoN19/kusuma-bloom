-- AlterTable
ALTER TABLE `users` ADD COLUMN `address` TEXT NULL,
    ADD COLUMN `gender` ENUM('MALE', 'FEMALE') NULL;

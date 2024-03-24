-- AlterTable
ALTER TABLE `users` MODIFY `gender` ENUM('MALE', 'FEMALE') NULL DEFAULT 'MALE';

-- CreateTable
CREATE TABLE `memberUsers` (
    `id` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `discount` DOUBLE NOT NULL DEFAULT 0.3,
    `userId` VARCHAR(191) NOT NULL,
    `acceptedBy` VARCHAR(191) NULL,
    `verifiedAt` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `memberUsers_userId_key`(`userId`),
    UNIQUE INDEX `memberUsers_userId_acceptedBy_key`(`userId`, `acceptedBy`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `memberUsers` ADD CONSTRAINT `memberUsers_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the `scan_tickets` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `scan_tickets` DROP FOREIGN KEY `scan_tickets_acceptedBy_fkey`;

-- DropForeignKey
ALTER TABLE `scan_tickets` DROP FOREIGN KEY `scan_tickets_transactionId_fkey`;

-- DropTable
DROP TABLE `scan_tickets`;

-- CreateTable
CREATE TABLE `scanTickets` (
    `id` VARCHAR(191) NOT NULL,
    `transactionId` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT false,
    `expired` DATETIME(3) NOT NULL,
    `acceptedBy` VARCHAR(191) NOT NULL,
    `scannedAt` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `scanTickets_transactionId_key`(`transactionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `scanTickets` ADD CONSTRAINT `scanTickets_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `transactions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `scanTickets` ADD CONSTRAINT `scanTickets_acceptedBy_fkey` FOREIGN KEY (`acceptedBy`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `expired` on the `scantickets` table. All the data in the column will be lost.
  - Added the required column `expired` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `scantickets` DROP FOREIGN KEY `scanTickets_acceptedBy_fkey`;

-- AlterTable
ALTER TABLE `scantickets` DROP COLUMN `expired`,
    MODIFY `acceptedBy` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `transactions` ADD COLUMN `expired` DATETIME(3) NOT NULL,
    MODIFY `payment_type` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `scanTickets` ADD CONSTRAINT `scanTickets_acceptedBy_fkey` FOREIGN KEY (`acceptedBy`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

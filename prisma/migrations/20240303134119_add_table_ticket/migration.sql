/*
  Warnings:

  - You are about to drop the column `month` on the `tickets` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[fromDate,toDate]` on the table `tickets` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fromDate` to the `tickets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toDate` to the `tickets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `tickets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tickets` DROP COLUMN `month`,
    ADD COLUMN `fromDate` DATETIME(3) NOT NULL,
    ADD COLUMN `toDate` DATETIME(3) NOT NULL,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `tickets_fromDate_toDate_key` ON `tickets`(`fromDate`, `toDate`);

-- AddForeignKey
ALTER TABLE `tickets` ADD CONSTRAINT `tickets_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

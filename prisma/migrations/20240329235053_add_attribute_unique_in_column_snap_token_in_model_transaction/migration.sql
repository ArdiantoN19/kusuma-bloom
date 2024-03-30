/*
  Warnings:

  - A unique constraint covering the columns `[snap_token]` on the table `transactions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `transactions_snap_token_key` ON `transactions`(`snap_token`);

/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `vouchers` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `vouchers_name_key` ON `vouchers`(`name`);

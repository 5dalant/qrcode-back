/*
  Warnings:

  - Made the column `siteUrl` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `User` MODIFY `siteUrl` VARCHAR(191) NOT NULL;

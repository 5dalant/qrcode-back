/*
  Warnings:

  - You are about to drop the column `companyId` on the `Qrcode` table. All the data in the column will be lost.
  - You are about to drop the column `companyId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Company` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userName]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Qrcode` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Qrcode` DROP FOREIGN KEY `Qrcode_ibfk_1`;

-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_ibfk_1`;

-- DropIndex
DROP INDEX `User.email_unique` ON `User`;

-- AlterTable
ALTER TABLE `Qrcode` DROP COLUMN `companyId`,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `companyId`,
    DROP COLUMN `email`,
    ADD COLUMN `userName` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `Company`;

-- CreateIndex
CREATE UNIQUE INDEX `User.userName_unique` ON `User`(`userName`);

-- AddForeignKey
ALTER TABLE `Qrcode` ADD FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

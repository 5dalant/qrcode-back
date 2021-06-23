/*
  Warnings:

  - A unique constraint covering the columns `[companyName]` on the table `Company` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE `Qrcode` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `qrcodeName` VARCHAR(191) NOT NULL,
    `forwardUrl` VARCHAR(191) NOT NULL,
    `requestUrl` VARCHAR(191) NOT NULL,
    `img` VARCHAR(191) NOT NULL,
    `companyId` INTEGER NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Qrcode.requestUrl_unique`(`requestUrl`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Company.companyName_unique` ON `Company`(`companyName`);

-- AddForeignKey
ALTER TABLE `Qrcode` ADD FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the `QrCode` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `QrCode` DROP FOREIGN KEY `QrCode_ibfk_1`;

-- DropTable
DROP TABLE `QrCode`;

-- CreateTable
CREATE TABLE `Qrcode` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `qrCodeName` VARCHAR(191) NOT NULL,
    `forwardUrl` VARCHAR(191) NOT NULL,
    `requestUrl` VARCHAR(191) NOT NULL,
    `img` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Qrcode.requestUrl_unique`(`requestUrl`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Qrcode` ADD FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

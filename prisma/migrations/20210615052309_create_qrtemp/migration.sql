-- CreateTable
CREATE TABLE `Qrtemp` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `qrTempName` VARCHAR(191) NOT NULL,
    `forwardUrl` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Qrtemp` ADD FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
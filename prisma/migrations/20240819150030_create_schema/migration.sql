-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `userName` VARCHAR(191) NOT NULL,
    `regNo` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `mobile` VARCHAR(191) NOT NULL,
    `companyName` VARCHAR(191) NOT NULL,
    `bisunessAdd` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NULL,
    `role` VARCHAR(191) NOT NULL DEFAULT 'user',
    `isApproved` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_mobile_key`(`mobile`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Mst_Bank_Details` (
    `id` VARCHAR(191) NOT NULL,
    `bankName` VARCHAR(191) NOT NULL,
    `accName` VARCHAR(191) NOT NULL,
    `accNo` VARCHAR(191) NOT NULL,
    `branch` VARCHAR(191) NOT NULL,
    `routingNo` VARCHAR(191) NOT NULL,
    `district` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Visa_Apply` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `givenName` VARCHAR(191) NOT NULL,
    `surName` VARCHAR(191) NULL,
    `gender` VARCHAR(191) NOT NULL,
    `nationality` VARCHAR(191) NOT NULL,
    `buyingPrise` DOUBLE NULL,
    `sellingPrise` DOUBLE NULL,
    `trackingId` VARCHAR(191) NULL,
    `applyForCountry` VARCHAR(191) NOT NULL,
    `deliveredVisa` VARCHAR(191) NULL,
    `applicationCopy` VARCHAR(191) NULL,
    `paymentReceive` VARCHAR(191) NULL,
    `passportNo` VARCHAR(191) NOT NULL,
    `passExpiryDate` VARCHAR(191) NOT NULL,
    `dob` VARCHAR(191) NOT NULL,
    `religion` VARCHAR(191) NULL,
    `mobileNo` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `profession` VARCHAR(191) NULL,
    `localAdd` VARCHAR(191) NULL,
    `foreignAdd` VARCHAR(191) NULL,
    `comment` VARCHAR(191) NULL,
    `isApproved` VARCHAR(191) NOT NULL DEFAULT 'SUBMITTED',
    `passportPdf` VARCHAR(191) NOT NULL,
    `otherDocumentPdf` VARCHAR(191) NULL,
    `previousPassPdf` VARCHAR(191) NULL,
    `image` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Deposit_Request` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `dpType` VARCHAR(191) NOT NULL,
    `date` VARCHAR(191) NOT NULL,
    `amount` DOUBLE NOT NULL,
    `bankName` VARCHAR(191) NOT NULL,
    `trnId` VARCHAR(191) NULL,
    `chequeNo` VARCHAR(191) NULL,
    `paySlip` VARCHAR(191) NULL,
    `slipImage` VARCHAR(191) NULL,
    `comment` VARCHAR(191) NULL,
    `isApproved` VARCHAR(191) NOT NULL DEFAULT 'SUBMITTED',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Loan_Request` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `reqDate` VARCHAR(191) NOT NULL,
    `settlmentDate` VARCHAR(191) NOT NULL,
    `amount` DOUBLE NOT NULL,
    `remarks` VARCHAR(191) NULL,
    `comment` VARCHAR(191) NULL,
    `isApproved` VARCHAR(191) NOT NULL DEFAULT 'SUBMITTED',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Visa_Apply` ADD CONSTRAINT `Visa_Apply_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Deposit_Request` ADD CONSTRAINT `Deposit_Request_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Loan_Request` ADD CONSTRAINT `Loan_Request_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

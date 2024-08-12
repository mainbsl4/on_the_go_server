-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "regNo" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "bisunessAdd" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT,
    "role" TEXT NOT NULL DEFAULT 'user',
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mst_Bank_Details" (
    "id" TEXT NOT NULL,
    "bankName" TEXT NOT NULL,
    "accName" TEXT NOT NULL,
    "accNo" TEXT NOT NULL,
    "branch" TEXT NOT NULL,
    "routingNo" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Mst_Bank_Details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Visa_Apply" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "givenName" TEXT NOT NULL,
    "surName" TEXT,
    "gender" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "buyingPrise" DOUBLE PRECISION,
    "sellingPrise" DOUBLE PRECISION,
    "trackingId" TEXT,
    "applyForCountry" TEXT NOT NULL,
    "deliveredVisa" TEXT,
    "applicationCopy" TEXT,
    "paymentReceive" TEXT,
    "passportNo" TEXT NOT NULL,
    "passExpiryDate" TEXT NOT NULL,
    "dob" TEXT NOT NULL,
    "religion" TEXT,
    "mobileNo" TEXT,
    "email" TEXT,
    "profession" TEXT,
    "localAdd" TEXT,
    "foreignAdd" TEXT,
    "comment" TEXT,
    "isApproved" TEXT NOT NULL DEFAULT 'SUBMITTED',
    "passportPdf" TEXT NOT NULL,
    "otherDocumentPdf" TEXT,
    "previousPassPdf" TEXT,
    "image" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Visa_Apply_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Deposit_Request" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "dpType" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "bankName" TEXT NOT NULL,
    "trnId" TEXT,
    "chequeNo" TEXT,
    "paySlip" TEXT,
    "slipImage" TEXT,
    "comment" TEXT,
    "isApproved" TEXT NOT NULL DEFAULT 'SUBMITTED',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Deposit_Request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Loan_Request" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "reqDate" TEXT NOT NULL,
    "settlmentDate" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "remarks" TEXT,
    "comment" TEXT,
    "isApproved" TEXT NOT NULL DEFAULT 'SUBMITTED',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Loan_Request_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_mobile_key" ON "User"("mobile");

-- AddForeignKey
ALTER TABLE "Visa_Apply" ADD CONSTRAINT "Visa_Apply_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deposit_Request" ADD CONSTRAINT "Deposit_Request_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Loan_Request" ADD CONSTRAINT "Loan_Request_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

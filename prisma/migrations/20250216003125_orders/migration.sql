-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('DEPOSIT', 'DEDUCTION', 'REFUND');

-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('FAILED', 'PENDING', 'COMPLETED');

-- CreateTable
CREATE TABLE "WalletTransaction" (
    "id" SERIAL NOT NULL,
    "userId" UUID NOT NULL,
    "transactionType" "TransactionType",
    "amount" DECIMAL(20,2) NOT NULL,
    "orderId" INTEGER NOT NULL,
    "status" "TransactionStatus" NOT NULL DEFAULT 'COMPLETED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WalletTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GasStation" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "location" VARCHAR(255) NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "rating" DECIMAL(2,1) NOT NULL,
    "estimatedDeliveryTime" TEXT NOT NULL,
    "status" VARCHAR(20) NOT NULL,
    "proximity" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "GasStation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GasSize" (
    "id" SERIAL NOT NULL,
    "stationId" INTEGER NOT NULL,
    "size" VARCHAR(20) NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GasSize_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "userId" UUID NOT NULL,
    "stationId" INTEGER NOT NULL,
    "gasSize" VARCHAR(20) NOT NULL,
    "refillSize" DECIMAL(10,2) NOT NULL,
    "deliveryAddress" VARCHAR(255) NOT NULL,
    "paymentMethod" VARCHAR(50) NOT NULL,
    "amountDue" DECIMAL(10,2) NOT NULL,
    "orderStatus" "TransactionStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PayOnDeliveryOrder" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "deliveryAddress" VARCHAR(255) NOT NULL,
    "phoneNumber" VARCHAR(20) NOT NULL,
    "amountDue" DECIMAL(10,2) NOT NULL,
    "status" "TransactionStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PayOnDeliveryOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transfer" (
    "id" SERIAL NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "bankName" VARCHAR(255) NOT NULL,
    "accountNumber" VARCHAR(255) NOT NULL,
    "transactionId" INTEGER NOT NULL,
    "status" "TransactionStatus" NOT NULL DEFAULT 'PENDING',
    "proofOfPayment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transfer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WalletTransaction_userId_key" ON "WalletTransaction"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "WalletTransaction_orderId_key" ON "WalletTransaction"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "GasSize_stationId_key" ON "GasSize"("stationId");

-- CreateIndex
CREATE UNIQUE INDEX "Order_stationId_key" ON "Order"("stationId");

-- CreateIndex
CREATE UNIQUE INDEX "PayOnDeliveryOrder_orderId_key" ON "PayOnDeliveryOrder"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "Transfer_transactionId_key" ON "Transfer"("transactionId");

-- AddForeignKey
ALTER TABLE "WalletTransaction" ADD CONSTRAINT "WalletTransaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WalletTransaction" ADD CONSTRAINT "WalletTransaction_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GasSize" ADD CONSTRAINT "GasSize_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "GasStation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "GasStation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PayOnDeliveryOrder" ADD CONSTRAINT "PayOnDeliveryOrder_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transfer" ADD CONSTRAINT "Transfer_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "WalletTransaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

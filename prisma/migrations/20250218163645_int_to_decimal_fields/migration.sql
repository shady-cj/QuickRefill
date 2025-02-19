/*
  Warnings:

  - You are about to alter the column `accountBalance` on the `CustomerProfile` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Decimal(20,2)`.
  - You are about to alter the column `avgRating` on the `CustomerProfile` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(2,1)`.
  - You are about to alter the column `accountBalance` on the `DeliveryRepProfile` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Decimal(20,2)`.
  - You are about to alter the column `avgRating` on the `DeliveryRepProfile` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(2,1)`.
  - You are about to alter the column `accountBalance` on the `VendorProfile` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Decimal(20,2)`.
  - You are about to alter the column `avgRating` on the `VendorProfile` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(2,1)`.

*/
-- AlterTable
ALTER TABLE "CustomerProfile" ALTER COLUMN "accountBalance" SET DATA TYPE DECIMAL(20,2),
ALTER COLUMN "avgRating" SET DATA TYPE DECIMAL(2,1);

-- AlterTable
ALTER TABLE "DeliveryRepProfile" ALTER COLUMN "accountBalance" SET DATA TYPE DECIMAL(20,2),
ALTER COLUMN "avgRating" SET DATA TYPE DECIMAL(2,1);

-- AlterTable
ALTER TABLE "VendorProfile" ALTER COLUMN "accountBalance" SET DATA TYPE DECIMAL(20,2),
ALTER COLUMN "avgRating" SET DATA TYPE DECIMAL(2,1);

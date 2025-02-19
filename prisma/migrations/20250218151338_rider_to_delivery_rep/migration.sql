/*
  Warnings:

  - The values [RIDER] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `RiderProfile` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('CUSTOMER', 'DELIVERY_REP', 'VENDOR', 'ADMIN');
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'CUSTOMER';
COMMIT;

-- DropForeignKey
ALTER TABLE "RiderProfile" DROP CONSTRAINT "RiderProfile_userId_fkey";

-- DropTable
DROP TABLE "RiderProfile";

-- CreateTable
CREATE TABLE "DeliveryRepProfile" (
    "id" UUID NOT NULL,
    "accountBalance" BIGINT NOT NULL,
    "avgRating" INTEGER NOT NULL,
    "credentialsVerified" BOOLEAN NOT NULL DEFAULT false,
    "userId" UUID NOT NULL,

    CONSTRAINT "DeliveryRepProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DeliveryRepProfile_userId_key" ON "DeliveryRepProfile"("userId");

-- AddForeignKey
ALTER TABLE "DeliveryRepProfile" ADD CONSTRAINT "DeliveryRepProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

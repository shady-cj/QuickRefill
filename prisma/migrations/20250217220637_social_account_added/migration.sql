-- CreateEnum
CREATE TYPE "SocialAccountProvider" AS ENUM ('FACEBOOK', 'GOOGLE');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isSocialAccount" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "socialAccountProvider" "SocialAccountProvider";

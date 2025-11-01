/*
  Warnings:

  - You are about to drop the column `followingCount` on the `Follow` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Follow" DROP COLUMN "followingCount";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "followerCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "followingCount" INTEGER NOT NULL DEFAULT 0;

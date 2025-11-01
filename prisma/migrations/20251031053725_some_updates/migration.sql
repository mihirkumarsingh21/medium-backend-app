/*
  Warnings:

  - You are about to drop the column `type` on the `Follow` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Follow" DROP COLUMN "type";

-- DropEnum
DROP TYPE "public"."FollowType";

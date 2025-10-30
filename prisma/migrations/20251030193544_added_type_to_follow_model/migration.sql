-- CreateEnum
CREATE TYPE "FollowType" AS ENUM ('FOLLOW', 'UNFOLLOW');

-- AlterTable
ALTER TABLE "Follow" ADD COLUMN     "followerCount" INTEGER,
ADD COLUMN     "followingCount" INTEGER,
ADD COLUMN     "type" "FollowType" NOT NULL DEFAULT 'UNFOLLOW';

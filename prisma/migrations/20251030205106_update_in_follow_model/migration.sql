-- DropForeignKey
ALTER TABLE "public"."Follow" DROP CONSTRAINT "Follow_following_id_fkey";

-- AlterTable
ALTER TABLE "Follow" ALTER COLUMN "following_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_following_id_fkey" FOREIGN KEY ("following_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

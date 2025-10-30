-- DropForeignKey
ALTER TABLE "public"."Reaction" DROP CONSTRAINT "Reaction_user_id_fkey";

-- AlterTable
ALTER TABLE "Reaction" ALTER COLUMN "user_id" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Follow" (
    "id" SERIAL NOT NULL,
    "follower_id" INTEGER NOT NULL,
    "following_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Follow_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Follow_follower_id_following_id_key" ON "Follow"("follower_id", "following_id");

-- AddForeignKey
ALTER TABLE "Reaction" ADD CONSTRAINT "Reaction_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_follower_id_fkey" FOREIGN KEY ("follower_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_following_id_fkey" FOREIGN KEY ("following_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

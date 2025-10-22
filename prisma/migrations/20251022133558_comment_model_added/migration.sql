/*
  Warnings:

  - Made the column `user_id` on table `Article` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."Article" DROP CONSTRAINT "Article_user_id_fkey";

-- AlterTable
ALTER TABLE "Article" ALTER COLUMN "user_id" SET NOT NULL;

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "article_id" INTEGER,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "Article"("id") ON DELETE SET NULL ON UPDATE CASCADE;

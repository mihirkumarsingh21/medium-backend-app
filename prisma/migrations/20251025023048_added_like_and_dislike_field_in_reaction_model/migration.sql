-- DropIndex
DROP INDEX "public"."Reaction_article_id_key";

-- DropIndex
DROP INDEX "public"."Reaction_user_id_key";

-- AlterTable
ALTER TABLE "Reaction" ADD COLUMN     "dislike" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "like" INTEGER NOT NULL DEFAULT 0;

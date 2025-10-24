-- CreateEnum
CREATE TYPE "ReactionType" AS ENUM ('LIKE', 'DISLIKE');

-- CreateTable
CREATE TABLE "Reaction" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "article_id" INTEGER NOT NULL,
    "type" "ReactionType" NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Reaction_user_id_key" ON "Reaction"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Reaction_article_id_key" ON "Reaction"("article_id");

-- CreateIndex
CREATE UNIQUE INDEX "Reaction_user_id_article_id_key" ON "Reaction"("user_id", "article_id");

-- AddForeignKey
ALTER TABLE "Reaction" ADD CONSTRAINT "Reaction_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reaction" ADD CONSTRAINT "Reaction_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "Article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

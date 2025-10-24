/*
  Warnings:

  - A unique constraint covering the columns `[category_id]` on the table `Article` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "category_id" INTEGER;

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Article_category_id_key" ON "Article"("category_id");

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

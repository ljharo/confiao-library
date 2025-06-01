/*
  Warnings:

  - Added the required column `title` to the `PersonalBook` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PersonalBook" ADD COLUMN     "author" TEXT,
ADD COLUMN     "coverUrl" TEXT,
ADD COLUMN     "cover_url" TEXT,
ADD COLUMN     "publishYear" INTEGER,
ADD COLUMN     "title" TEXT NOT NULL;

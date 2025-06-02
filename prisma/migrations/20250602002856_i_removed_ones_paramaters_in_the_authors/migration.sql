/*
  Warnings:

  - You are about to drop the `_AuthorToPersonalBook` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_AuthorToPersonalBook" DROP CONSTRAINT "_AuthorToPersonalBook_A_fkey";

-- DropForeignKey
ALTER TABLE "_AuthorToPersonalBook" DROP CONSTRAINT "_AuthorToPersonalBook_B_fkey";

-- DropTable
DROP TABLE "_AuthorToPersonalBook";

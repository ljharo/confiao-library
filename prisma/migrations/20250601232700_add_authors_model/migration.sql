-- CreateTable
CREATE TABLE "Author" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AuthorToPersonalBook" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_AuthorToPersonalBook_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Author_name_country_key" ON "Author"("name", "country");

-- CreateIndex
CREATE INDEX "_AuthorToPersonalBook_B_index" ON "_AuthorToPersonalBook"("B");

-- AddForeignKey
ALTER TABLE "_AuthorToPersonalBook" ADD CONSTRAINT "_AuthorToPersonalBook_A_fkey" FOREIGN KEY ("A") REFERENCES "Author"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AuthorToPersonalBook" ADD CONSTRAINT "_AuthorToPersonalBook_B_fkey" FOREIGN KEY ("B") REFERENCES "PersonalBook"("id") ON DELETE CASCADE ON UPDATE CASCADE;

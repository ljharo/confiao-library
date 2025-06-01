-- CreateTable
CREATE TABLE "PersonalBook" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "openLibraryId" TEXT NOT NULL,
    "price" DOUBLE PRECISION,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PersonalBook_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PersonalBook_userId_openLibraryId_key" ON "PersonalBook"("userId", "openLibraryId");

-- AddForeignKey
ALTER TABLE "PersonalBook" ADD CONSTRAINT "PersonalBook_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

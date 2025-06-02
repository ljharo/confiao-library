import { PrismaClient } from "@prisma/client";
import { getBookMetadata } from "./openLibrary.service";

const prisma = new PrismaClient();

interface AddBookParams {
  userId: number;
  openLibraryId: string;
  price?: number;
  notes?: string;
}

export async function addBookToLibrary({
  userId,
  openLibraryId,
  price,
  notes,
}: AddBookParams) {
  const existingBook = await prisma.personalBook.findFirst({
    where: {
      userId,
      openLibraryId,
    },
  });

  if (existingBook) {
    throw { message: "Book already exists in your library" };
  }

  if (!price) {
    throw { message: "Price is required" };
  } else if (price <= 0) {
    throw { message: "Price must be greater than 0" };
  }

  // Obtener metadatos del libro
  const metadata = await getBookMetadata(openLibraryId);

  // Crear el libro en la base de datos
  return await prisma.personalBook.create({
    data: {
      userId,
      openLibraryId,
      title: metadata.title,
      author: metadata.authors,
      publishYear: metadata.publishYear,
      price,
      notes,
      coverUrl: metadata.coverUrl,
    },
    select: {
      id: true,
      openLibraryId: true,
      title: true,
      author: true,
      publishYear: true,
      price: true,
      notes: true,
      coverUrl: true,
      createdAt: true,
    },
  });
}

export async function getAllPersonalBooks(userId: number) {
  return await prisma.personalBook.findMany({
    where: { userId },
    select: {
      id: true,
      openLibraryId: true,
      title: true,
      author: true,
      publishYear: true,
      coverUrl: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getPersonalBookDetails(userId: number, localId: number) {
  return await prisma.personalBook.findUnique({
    where: {
      id: localId,
      userId, // Asegura que el libro pertenece al usuario
    },
    select: {
      id: true,
      openLibraryId: true,
      title: true,
      author: true,
      publishYear: true,
      price: true,
      notes: true,
      coverUrl: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

export async function updateBookNotes(
  userId: number,
  localId: number,
  notes: string
) {
  return await prisma.personalBook.update({
    where: {
      id: localId,
      userId,
    },
    data: {
      notes,
    },
    select: {
      id: true,
      title: true,
      notes: true,
      updatedAt: true,
    },
  });
}

export async function deletePersonalBook(userId: number, localId: number) {
  return await prisma.personalBook.delete({
    where: {
      id: localId,
      userId,
    },
  });
}

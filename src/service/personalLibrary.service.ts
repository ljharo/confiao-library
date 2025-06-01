import { PrismaClient } from "@prisma/client";
import { getBookMetadata } from "./openLibrary.service";

const prisma = new PrismaClient();

interface AddBookParams {
  userId: number;
  openLibraryId: string;
  price?: number;
  notes?: string;
}

export const addBookToLibrary = async ({
  userId,
  openLibraryId,
  price,
  notes,
}: AddBookParams) => {
  // Verificar si el libro ya existe
  const existingBook = await prisma.personalBook.findFirst({
    where: {
      userId,
      openLibraryId,
    },
  });

  if (existingBook) {
    throw { code: "P2002", message: "Book already exists in your library" };
  }

  // Obtener metadatos del libro
  const metadata = await getBookMetadata(openLibraryId);

  // Crear el libro en la base de datos
  return await prisma.personalBook.create({
    data: {
      userId,
      openLibraryId,
      title: metadata.title,
      author: metadata.authors?.join(", "),
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
};

export const getAllPersonalBooks = async (userId: number) => {
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
};

export const getPersonalBookDetails = async (
  userId: number,
  localId: number
) => {
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
};

export const updateBookNotes = async (
  userId: number,
  localId: number,
  notes: string
) => {
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
};

export const deletePersonalBook = async (userId: number, localId: number) => {
  return await prisma.personalBook.delete({
    where: {
      id: localId,
      userId,
    },
  });
};

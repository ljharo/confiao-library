import prisma from "../config/prisma";
import { getBookMetadata } from "./openLibrary.service";

/**
 * Parameters for adding a book to a user's library.
 * @interface AddBookParams
 * @property {number} userId - ID of the user adding the book.
 * @property {string} openLibraryId - Open Library identifier for the book.
 * @property {number} [price] - Optional price of the book (required when adding).
 * @property {string} [notes] - Optional personal notes about the book.
 */
interface AddBookParams {
  userId: number;
  openLibraryId: string;
  price?: number;
  notes?: string;
}

/**
 * Adds a book to a user's personal library with metadata from Open Library.
 * @async
 * @param {AddBookParams} params - Book addition parameters.
 * @returns {Promise<{
 *   id: number,
 *   openLibraryId: string,
 *   title: string,
 *   author: string | undefined,
 *   publishYear: number | undefined,
 *   price: number,
 *   notes: string | undefined,
 *   coverUrl: string | undefined,
 *   createdAt: Date
 * }>} The created personal book record.
 * @throws {Object} Throws an object with `message` property if:
 * - Book already exists in library
 * - Price is missing or invalid
 * - Failed to fetch book metadata
 * @example
 * await addBookToLibrary({
 *   userId: 1,
 *   openLibraryId: 'OL123W',
 *   price: 29.99,
 *   notes: 'First edition'
 * });
 */
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

/**
 * Retrieves all personal books for a user, sorted by creation date (newest first).
 * @async
 * @param {number} userId - ID of the user.
 * @returns {Promise<Array<{
 *   id: number,
 *   openLibraryId: string,
 *   title: string,
 *   author: string | undefined,
 *   publishYear: number | undefined,
 *   coverUrl: string | undefined,
 *   createdAt: Date
 * }>>} Array of personal book records without sensitive/editable fields.
 * @example
 * await getAllPersonalBooks(1); // Returns all books for user 1
 */
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

/**
 * Gets detailed information about a specific personal book.
 * @async
 * @param {number} userId - ID of the book owner (for verification).
 * @param {number} localId - Local database ID of the book.
 * @returns {Promise<{
 *   id: number,
 *   openLibraryId: string,
 *   title: string,
 *   author: string | undefined,
 *   publishYear: number | undefined,
 *   price: number,
 *   notes: string | undefined,
 *   coverUrl: string | undefined,
 *   createdAt: Date,
 *   updatedAt: Date
 * } | null>} Complete book details or null if not found.
 * @example
 * await getPersonalBookDetails(1, 5); // Returns details for book ID 5 if owned by user 1
 */
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

/**
 * Updates the personal notes for a book.
 * @async
 * @param {number} userId - ID of the book owner (for verification).
 * @param {number} localId - Local database ID of the book.
 * @param {string} notes - New notes content.
 * @returns {Promise<{
 *   id: number,
 *   title: string,
 *   notes: string | undefined,
 *   updatedAt: Date
 * }>} Updated book information.
 * @throws Will throw if book doesn't exist or doesn't belong to user.
 * @example
 * await updateBookNotes(1, 5, 'New notes about this book');
 */
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

/**
 * Permanently removes a book from a user's personal library.
 * @async
 * @param {number} userId - ID of the book owner (for verification).
 * @param {number} localId - Local database ID of the book to delete.
 * @returns {Promise<{
 *   id: number,
 *   title: string,
 *   userId: number,
 *   // ... other book properties
 * }>} The deleted book record.
 * @throws Will throw if book doesn't exist or doesn't belong to user.
 * @example
 * await deletePersonalBook(1, 5); // Deletes book ID 5 if owned by user 1
 */
export async function deletePersonalBook(userId: number, localId: number) {
  return await prisma.personalBook.delete({
    where: {
      id: localId,
      userId,
    },
  });
}

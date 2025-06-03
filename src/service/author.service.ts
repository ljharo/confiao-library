import prisma from "../config/prisma";

/**
 * Basic author data.
 * @interface AuthorData
 * @property {string} name - Author's name (required).
 * @property {string} [country] - Author's country of origin (optional).
 */
interface AuthorData {
  name: string;
  country?: string;
}

/**
 * Creates a new author in the database.
 * @param {AuthorData} data - An object containing the author's data.
 * @returns {Promise<{id: number, name: string, country: string | null, createdAt: Date}>}
 * An object containing the created author's data, including automatic fields like `id` and `createdAt`.
 * @example
 * await createAuthor({ name: "Gabriel García Márquez", country: "Colombia" });
 */
export async function createAuthor(data: AuthorData) {
  return await prisma.author.create({
    data,
    select: {
      id: true,
      name: true,
      country: true,
      createdAt: true,
    },
  });
}

/**
 * Gets all registered authors, sorted alphabetically by name.
 * @returns {Promise<Array<{id: number, name: string, country: string | null}>>}
 * List of authors without sensitive fields.
 * @example
 * await getAllAuthors(); // Returns: [{id: 1, name: "Jane Austen", country: "UK"}, ...]
 */
export async function getAllAuthors() {
  return await prisma.author.findMany({
    select: {
      id: true,
      name: true,
      country: true,
    },
    orderBy: {
      name: "asc",
    },
  });
}

/**
 * Search for an author by their ID.
 * @param {number} id - The ID of the author to search for.
 * @returns {Promise<{id: number, name: string, country: string | null, createdAt: Date, updatedAt: Date} | null>}
 * Full author details (including timestamps) or `null` if the author doesn't exist.
 * @throws {Error} If the ID isn't a valid number.
 * @example
 * await getAuthorById(1); // Returns: {id: 1, name: "George Orwell", country: "UK", ...}
 */
export async function getAuthorById(id: number) {
  return await prisma.author.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      country: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

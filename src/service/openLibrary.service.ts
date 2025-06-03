import axios from "axios";

/**
 * Represents a book from Open Library search results.
 * @interface Book
 * @property {string} title - The title of the book.
 * @property {string[]} [author_name] - Optional array of author names.
 * @property {number} [first_publish_year] - Optional year of first publication.
 * @property {number} [cover_i] - Optional cover image ID.
 * @property {string} openLibraryId - The unique identifier from Open Library (without '/works/' prefix).
 * @property {string|null} cover_url - URL to medium-sized cover image or null if not available.
 */
interface Book {
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
  openLibraryId: string;
}

/**
 * Represents detailed metadata for a book.
 * @interface BookMetadata
 * @property {string} title - The title of the book.
 * @property {string} [authors] - Comma-separated list of authors or "Unknown author".
 * @property {number} [publishYear] - Year of first publication if available.
 * @property {string} [coverUrl] - URL to medium-sized cover image if available.
 */
interface BookMetadata {
  title: string;
  authors?: string;
  publishYear?: number;
  coverUrl?: string;
}

/**
 * Searches for books in Open Library by query.
 * @async
 * @param {string} query - Search term (title, author, etc.).
 * @returns {Promise<Book[]>} Array of book objects from search results.
 * @throws {Error} If the API request fails.
 * @example
 * const results = await searchBooks("harry potter");
 * // Returns array of Book objects matching the query
 */
export async function searchBooks(query: string): Promise<Book[]> {
  try {
    const response = await axios.get(
      `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`
    );

    return response.data.docs.map((book: any) => ({
      title: book.title,
      author_name: book.author_name,
      first_publish_year: book.first_publish_year,
      openLibraryId: book.key.replace("/works/", ""),
      cover_url: book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
        : null,
    }));
  } catch (error) {
    console.error("Error searching books:", error);
    throw new Error("Failed to fetch books from Open Library");
  }
}

/**
 * Fetches detailed metadata for a specific book from Open Library.
 * @async
 * @param {string} openLibraryId - The book's Open Library ID (without '/works/' prefix).
 * @returns {Promise<BookMetadata>} Detailed book metadata.
 * @throws {Error} If the API request fails.
 * @example
 * const metadata = await getBookMetadata("OL123W");
 * // Returns detailed metadata including author names and cover URL
 */
export async function getBookMetadata(
  openLibraryId: string
): Promise<BookMetadata> {
  try {
    const response = await axios.get(
      `https://openlibrary.org/works/${openLibraryId}.json`
    );

    const data = response.data;
    const coverId = data.covers?.[0];

    // Obtener información de autores (versión corregida)
    let authors = "Unknown author";
    if (data.authors && data.authors.length > 0) {
      const authorRequests = data.authors.map(async (author: any) => {
        try {
          const path = author.author?.key;
          if (!path) return "Unknown author";

          const response = await axios.get(
            `https://openlibrary.org${path}.json`
          );
          return response.data.name || "Unknown author";
        } catch (error) {
          console.error("Error fetching author details:", error);
          return "Unknown author";
        }
      });

      // Esperar a que todas las solicitudes de autores se completen
      const authorNames = await Promise.all(authorRequests);
      authors = authorNames.join(", ");
    }

    return {
      title: data.title || "No title available",
      authors,
      publishYear: data.first_publish_year || undefined,
      coverUrl: coverId
        ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
        : undefined,
    };
  } catch (error) {
    console.error("Error fetching book metadata:", error);
    throw new Error("Failed to fetch book details from Open Library");
  }
}

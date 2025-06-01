import axios from "axios";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface Book {
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
  openLibraryId: string;
}

export const searchBooks = async (query: string): Promise<Book[]> => {
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
};

interface BookMetadata {
  title: string;
  authors?: string[];
  publishYear?: number;
  coverUrl?: string;
}

export const getBookMetadata = async (
  openLibraryId: string
): Promise<BookMetadata> => {
  try {
    const response = await axios.get(
      `https://openlibrary.org/works/${openLibraryId}.json`
    );

    const data = response.data;
    const coverId = data.covers?.[0];

    return {
      title: data.title,
      authors: data.authors?.map((a: any) => a.author?.key),
      publishYear: data.first_publish_year,
      coverUrl: coverId
        ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
        : undefined,
    };
  } catch (error) {
    console.error("Error fetching book metadata:", error);
    throw new Error("Failed to fetch book details from Open Library");
  }
};

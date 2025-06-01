import { Request, Response } from "express";
import { searchBooks } from "../service/openLibrary.service";

export const searchBooksHandler = async (
  req: Request<{ query: string }>,
  res: Response
): Promise<void> => {
  try {
    const { query } = req.params;

    if (!query || typeof query !== "string") {
      res.status(400).json({
        error: "Query parameter is required",
      });
      return;
    }

    const books = await searchBooks(query);

    res.json({
      success: true,
      count: books.length,
      data: books,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

import { Request, Response } from "express";
import { searchBooks } from "../service/openLibrary.service";

export class BookController {
  public async searchBooksHandler(req: Request, res: Response): Promise<void> {
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
  }
}

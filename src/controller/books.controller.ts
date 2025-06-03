import { Request, Response } from "express";
import { searchBooks } from "../service/openLibrary.service";

/**
 * BookController handles requests related to books.
 */
export class BookController {
  /**
   * Searches for books based on a query parameter.
   *
   * @param req - The request object containing the search query in the parameters.
   * @param res - The response object used to send back the desired HTTP response.
   * @returns A promise that resolves to void.
   */
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

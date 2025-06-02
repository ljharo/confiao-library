import { Request, Response, NextFunction } from "express";
import {
  addBookToLibrary,
  getAllPersonalBooks,
  getPersonalBookDetails,
  updateBookNotes,
  deletePersonalBook,
} from "../service/personalLibrary.service";

export class PersonalLibraryController {
  public async addBook(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = (req as any).user.userId;
      const { openLibraryId, price, notes } = req.body;

      if (!openLibraryId) {
        res.status(400).json({
          success: false,
          error: "openLibraryId is required",
        });
        return;
      }

      const book = await addBookToLibrary({
        userId,
        openLibraryId,
        price,
        notes,
      });

      res.status(201).json({
        success: true,
        data: book,
      });
    } catch (error: any) {
      next(error);
    }
  }

  public async getBooks(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user.userId;
      const books = await getAllPersonalBooks(userId);

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

  public async getBookDetails(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user.userId;
      const localId = parseInt(req.params.localId);

      if (isNaN(localId)) {
        res.status(400).json({
          success: false,
          error: "Invalid book ID format",
        });
        return;
      }

      const book = await getPersonalBookDetails(userId, localId);

      if (!book) {
        res.status(404).json({
          success: false,
          error: "Book not found in your library",
        });
        return;
      }

      res.json({
        success: true,
        data: book,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  public async updateNotes(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user.userId;
      const localId = parseInt(req.params.localId);
      const { notes } = req.body;

      if (isNaN(localId)) {
        res.status(400).json({
          success: false,
          error: "Invalid book ID format",
        });
        return;
      }

      if (!notes || typeof notes !== "string") {
        res.status(400).json({
          success: false,
          error: "Notes are required and must be a string",
        });
        return;
      }

      const updatedBook = await updateBookNotes(userId, localId, notes);

      res.json({
        success: true,
        data: updatedBook,
      });
    } catch (error: any) {
      if (error.code === "P2025") {
        res.status(404).json({
          success: false,
          error: "Book not found in your library",
        });
        return;
      }
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  public async deleteBook(
    req: Request<{ localId: string }>,
    res: Response
  ): Promise<void> {
    try {
      const userId = (req as any).user.userId;
      const localId = parseInt(req.params.localId);

      if (isNaN(localId)) {
        res.status(400).json({
          success: false,
          error: "Invalid book ID format",
        });
        return;
      }

      await deletePersonalBook(userId, localId);

      res.status(204).end(); // No Content
    } catch (error: any) {
      if (error.code === "P2025") {
        res.status(404).json({
          success: false,
          error: "Book not found in your library",
        });
        return;
      }
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
}

import { Request, Response, NextFunction } from "express";
import {
  addBookToLibrary,
  getAllPersonalBooks,
  getPersonalBookDetails,
  updateBookNotes,
  deletePersonalBook,
} from "../service/personalLibrary.service";

interface AddBookRequestBody {
  openLibraryId: string;
  price?: number;
  notes?: string;
}

export const addBook = async (
  req: Request<{}, {}, AddBookRequestBody>,
  res: Response,
  next: NextFunction
): Promise<void> => {
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
};

// Tipo para los parámetros de la ruta
interface BookParams {
  localId: string;
}

// Controlador para obtener todos los libros
export const getBooks = async (req: Request, res: Response): Promise<void> => {
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
};

// Controlador para obtener detalles de un libro
export const getBookDetails = async (
  req: Request<BookParams>,
  res: Response
): Promise<void> => {
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
};

interface UpdateNotesRequest {
  notes: string;
}

export const updateNotes = async (
  req: Request<{ localId: string }, {}, UpdateNotesRequest>,
  res: Response
): Promise<void> => {
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
};

export const deleteBook = async (
  req: Request<{ localId: string }>,
  res: Response
): Promise<void> => {
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
};

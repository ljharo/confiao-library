import { Request, Response } from "express";
import {
  createAuthor,
  getAllAuthors,
  getAuthorById,
} from "../service/author.service";

/**
 * AuthorController handles requests related to authors.
 */
export class AuthorController {
  /**
   * Adds a new author to the database.
   *
   * @param req - The request object containing author details in the body.
   * @param res - The response object used to send back the desired HTTP response.
   * @returns A promise that resolves to void.
   */
  public async addAuthor(req: Request, res: Response): Promise<void> {
    try {
      const { name, country } = req.body;

      if (!name) {
        res.status(400).json({
          success: false,
          error: "Author name is required",
        });
        return;
      }

      const author = await createAuthor({ name, country });

      res.status(201).json({
        success: true,
        data: author,
      });
    } catch (error: any) {
      if (error.code === "P2002") {
        res.status(409).json({
          success: false,
          error: "Author already exists",
        });
        return;
      }
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  /**
   * Retrieves all authors from the database.
   *
   * @param req - The request object.
   * @param res - The response object used to send back the desired HTTP response.
   * @returns A promise that resolves to void.
   */
  public async getAuthors(req: Request, res: Response): Promise<void> {
    try {
      const authors = await getAllAuthors();

      res.json({
        success: true,
        count: authors.length,
        data: authors,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  /**
   * Retrieves a specific author by their ID.
   *
   * @param req - The request object containing the author ID in the parameters.
   * @param res - The response object used to send back the desired HTTP response.
   * @returns A promise that resolves to void.
   */
  public async getAuthor(
    req: Request<{ localId: string }>,
    res: Response
  ): Promise<void> {
    try {
      const localId = parseInt(req.params.localId);

      if (isNaN(localId)) {
        res.status(400).json({
          success: false,
          error: "Invalid author ID format",
        });
        return;
      }

      const author = await getAuthorById(localId);

      if (!author) {
        res.status(404).json({
          success: false,
          error: "Author not found",
        });
        return;
      }

      res.json({
        success: true,
        data: author,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
}

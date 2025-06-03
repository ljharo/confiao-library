import { Request, Response } from "express";
import * as authService from "../service/auth.service";

/**
 * Controller for handling authentication-related operations.
 * Provides methods for user registration, login, and logout.
 */
export class AuthController {
  /**
   * Handles user registration.
   * @async
   * @param {Request} req - Express request object containing registration data.
   * @param {Response} res - Express response object.
   * @returns {Promise<Response>} JSON response with user data and JWT token or error message.
   *
   * @throws {400 Bad Request} If registration fails (e.g., email already exists, invalid data).
   *
   * @example
   * // Request body:
   * {
   *   "email": "user@example.com",
   *   "password": "securePassword123",
   *   "name": "John Doe"
   * }
   *
   * // Success response:
   * {
   *   "success": true,
   *   "data": {
   *     "user": {
   *       "id": 1,
   *       "email": "user@example.com",
   *       "name": "John Doe"
   *     },
   *     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   *   }
   * }
   */
  public async register(req: Request, res: Response) {
    try {
      const { email, password, name } = req.body;
      const { user, token } = await authService.registerUser(
        email,
        password,
        name
      );

      res.status(201).json({
        success: true,
        data: {
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
          },
          token,
        },
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

  /**
   * Handles user login.
   * @async
   * @param {Request} req - Express request object containing login credentials.
   * @param {Response} res - Express response object.
   * @returns {Promise<Response>} JSON response with user data and JWT token or error message.
   *
   * @throws {401 Unauthorized} If login fails (invalid credentials).
   *
   * @example
   * // Request body:
   * {
   *   "email": "user@example.com",
   *   "password": "securePassword123"
   * }
   *
   * // Success response:
   * {
   *   "success": true,
   *   "data": {
   *     "user": {
   *       "id": 1,
   *       "email": "user@example.com",
   *       "name": "John Doe"
   *     },
   *     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   *   }
   * }
   */
  public async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const { user, token } = await authService.loginUser(email, password);

      res.json({
        success: true,
        data: {
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
          },
          token,
        },
      });
    } catch (error: any) {
      res.status(401).json({
        success: false,
        error: error.message,
      });
    }
  }

  /**
   * Handles user logout.
   * @async
   * @param {Request} req - Express request object containing JWT token in Authorization header.
   * @param {Response} res - Express response object.
   * @returns {Promise<Response>} JSON response with logout confirmation or error message.
   *
   * @throws {400 Bad Request} If logout fails (e.g., invalid token).
   *
   * @example
   * // Request headers:
   * Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   *
   * // Success response:
   * {
   *   "success": true,
   *   "data": {
   *     "success": true
   *   }
   * }
   */
  public async logout(req: Request, res: Response) {
    try {
      const token = req.headers.authorization?.split(" ")[1] || "";
      const result = await authService.logoutUser(token);

      res.json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }
}

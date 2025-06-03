import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

/**
 * Express middleware for JWT authentication.
 * Verifies the JWT token from the Authorization header and attaches the decoded payload to the request.
 *
 * @function authenticate
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 * @returns {Response|void} Returns a 401 error response if authentication fails, or calls next() if successful.
 *
 * @throws {401 Unauthorized} If:
 * - No token is provided in the Authorization header
 * - The token is invalid or expired
 *
 * @example
 * // In your route definitions:
 * router.get('/protected-route', authenticate, (req, res) => {
 *   // Only accessible with valid JWT
 *   res.json({ message: 'Protected data' });
 * });
 *
 * @example
 * // Expected Authorization header format:
 * Authorization: Bearer <your-jwt-token>
 */
export function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
): any {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = verifyToken(token);
    (req as any).user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
}

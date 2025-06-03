import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

type JwtSecret = jwt.Secret | string;

const JWT_SECRET = process.env.JWT_SECRET as JwtSecret;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET no está definido en .env");
}

interface JwtPayload {
  [key: string]: any;
}

/**
 * Generates a JWT token with the provided payload.
 * @param {JwtPayload} payload - Data to be encoded in the token.
 * @returns {string} The generated JWT token.
 * @throws {Error} If JWT_SECRET is not configured.
 * @example
 * const token = generateToken({ userId: 123 });
 * // Returns: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 */
export function generateToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  } as jwt.SignOptions);
}

/**
 * Verifies and decodes a JWT token.
 * @param {string} token - JWT token to verify.
 * @returns {string|jwt.JwtPayload} Decoded token payload if verification succeeds.
 * @throws {jwt.JsonWebTokenError} If token is invalid or expired.
 * @throws {jwt.NotBeforeError} If token is not yet valid.
 * @throws {jwt.TokenExpiredError} If token has expired.
 * @example
 * const payload = verifyToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...");
 * // Returns decoded payload or throws an error
 */
export function verifyToken(token: string): string | jwt.JwtPayload {
  return jwt.verify(token, JWT_SECRET);
}

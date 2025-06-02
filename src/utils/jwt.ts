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

export function generateToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  } as jwt.SignOptions);
}

export function verifyToken(token: string): string | jwt.JwtPayload {
  return jwt.verify(token, JWT_SECRET);
}

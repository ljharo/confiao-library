import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

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

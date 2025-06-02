import { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const getErrorLine = (error: Error): string => {
    if (!error.stack) return "No stack trace available";

    const stackLines = error.stack.split("\n");

    if (stackLines.length > 1) {
      const relevantLine = stackLines[1].trim();

      const match = relevantLine.match(/at (.+) \((.+):(\d+):(\d+)\)/);

      if (match) {
        const [, method, file, line, column] = match;
        return `Error en ${file}:${line}:${column} (${method})`;
      }

      return relevantLine;
    }

    return error.stack;
  };

  const errorLocation = getErrorLine(err);

  console.error("===== ERROR DETECTED =====");
  console.error(`Message: ${err.message}`);
  console.error(`Location: ${errorLocation}`);
  console.error("==========================");

  res.status(500).json({
    error: err.message,
    // Opcional: enviar solo en desarrollo
    ...(process.env.NODE_ENV === "development" && {
      details: err.message,
      location: errorLocation,
    }),
  });
}

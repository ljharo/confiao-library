import { Request, Response, NextFunction } from "express";

/**
 * Express error handling middleware.
 * Logs detailed error information and sends an appropriate response to the client.
 *
 * @function errorHandler
 * @param {Error} err - The error object caught by Express.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 * @returns {Response} JSON response with error details.
 *
 * @example
 * // In your Express app setup:
 * app.use(errorHandler);
 *
 * @example
 * // Sample error response in production:
 * // { "error": "Database connection failed" }
 *
 * @example
 * // Sample error response in development:
 * // {
 * //   "error": "Database connection failed",
 * //   "details": "Database connection failed",
 * //   "location": "Error en src/db.ts:42:15 (connectDB)"
 * // }
 */

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  /**
   * Extracts the relevant error location from the stack trace.
   * @param {Error} error - The error object to analyze.
   * @returns {string} Formatted error location string.
   * @private
   */
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

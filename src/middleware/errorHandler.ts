import { Request, Response, NextFunction } from "express";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Obtener la línea específica donde ocurrió el error
  const getErrorLine = (error: Error): string => {
    if (!error.stack) return "No stack trace available";

    // Dividir el stack trace por líneas
    const stackLines = error.stack.split("\n");

    // La línea relevante suele ser la segunda (índice 1)
    if (stackLines.length > 1) {
      // Extraer la parte importante de la línea
      const relevantLine = stackLines[1].trim();

      // Expresión regular para extraer archivo y línea
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
    error: "Something went wrong!",
    // Opcional: enviar solo en desarrollo
    ...(process.env.NODE_ENV === "development" && {
      details: err.message,
      location: errorLocation,
    }),
  });
};

export default errorHandler;

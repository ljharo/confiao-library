import errorHandler from "./middleware/errorHandler";
import authRouter from "./routes/auth.routes";
import bookRouter from "./routes/books.routes";
import personalLibraryRouter from "./routes/personalLibrary.routes";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middlewares básicos
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routers
app.use("/api/auth", authRouter);
app.use("/api/books", bookRouter);
app.use("/api/my-library", personalLibraryRouter);

// Error handler
app.use(errorHandler);

export default app;

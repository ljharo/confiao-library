import errorHandler from "./middleware/errorHandler";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middlewares básicos
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(errorHandler);

export default app;

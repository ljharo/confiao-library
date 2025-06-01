import { Router } from "express";
import { searchBooksHandler } from "../controller/books.controller";

const router = Router();

router.get("/search/:query", searchBooksHandler);

export default router;

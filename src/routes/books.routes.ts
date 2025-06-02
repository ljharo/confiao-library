import { Router } from "express";
import { BookController } from "../controller/books.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();
const controller = new BookController();

router.use(authenticate);

router.get("/search/:query", controller.searchBooksHandler);

export default router;

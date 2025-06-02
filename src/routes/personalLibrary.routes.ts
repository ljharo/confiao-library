import { Router } from "express";
import { PersonalLibraryController } from "../controller/personalLibrary.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();
const controller = new PersonalLibraryController();

router.use(authenticate);

router.post("/books", controller.addBook);
router.get("/books", controller.getBooks);
router.get("/books/:localId", controller.getBookDetails);
router.put("/books/:localId", controller.updateNotes);
router.delete("/books/:localId", controller.deleteBook);

export default router;

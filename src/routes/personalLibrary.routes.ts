import { Router } from "express";
import {
  addBook,
  getBooks,
  getBookDetails,
  updateNotes,
  deleteBook,
} from "../controller/personalLibrary.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

// Todas las rutas requieren autenticación
router.use(authenticate as any);

// Añadir libro a la biblioteca personal
router.post("/books", addBook);
router.get("/books", getBooks);
router.get("/books/:localId", getBookDetails);
router.put("/books/:localId", updateNotes);
router.delete("/books/:localId", deleteBook);

export default router;

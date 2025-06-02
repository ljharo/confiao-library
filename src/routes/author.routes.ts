import { Router } from "express";
import {
  addAuthor,
  getAuthors,
  getAuthor,
} from "../controller/author.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.use(authenticate as any);

router.post("", addAuthor);
router.get("", getAuthors);
router.get("/:localId", getAuthor);

export default router;

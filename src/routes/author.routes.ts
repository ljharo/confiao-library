import { Router } from "express";
import { AuthorController } from "../controller/author.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();
const controller = new AuthorController();

router.use(authenticate);

router.post("", controller.addAuthor);
router.get("", controller.getAuthors);
router.get("/:localId", controller.getAuthor);

export default router;

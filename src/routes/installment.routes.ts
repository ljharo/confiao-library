import { Router } from "express";
import {
  createBookInstallments,
  getBookInstallments,
} from "../controller/installment.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.use(authenticate as any);

router.post("/books/:localId/installments", createBookInstallments);
router.get("/books/:localId/installments", getBookInstallments);

export default router;

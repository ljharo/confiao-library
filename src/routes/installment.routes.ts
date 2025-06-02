import { Router } from "express";
import { InstallmentController } from "../controller/installment.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();
const controller = new InstallmentController();

router.use(authenticate);

router.post("/books/:localId/installments", controller.createBookInstallments);
router.get("/books/:localId/installments", controller.getBookInstallments);

export default router;

import { Request, Response } from "express";
import {
  createInstallmentPlan,
  getInstallmentPlan,
} from "../service/installment.service";

interface CreateInstallmentParams {
  localId: string;
}

interface CreateInstallmentBody {
  numberOfInstallments: number;
}

export const createBookInstallments = async (
  req: Request<CreateInstallmentParams, {}, CreateInstallmentBody>,
  res: Response
): Promise<void> => {
  try {
    const userId = (req as any).user.userId;
    const localId = parseInt(req.params.localId);
    const { numberOfInstallments } = req.body;

    if (isNaN(localId)) {
      res.status(400).json({
        success: false,
        error: "Invalid book ID format",
      });
      return;
    }

    if (!numberOfInstallments || numberOfInstallments < 1) {
      res.status(400).json({
        success: false,
        error: "Number of installments must be at least 1",
      });
      return;
    }

    const result = await createInstallmentPlan(
      localId,
      userId,
      numberOfInstallments
    );

    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    if (error.message.includes("not found")) {
      res.status(404).json({
        success: false,
        error: error.message,
      });
      return;
    }
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

interface GetInstallmentParams {
  localId: string;
}

export const getBookInstallments = async (
  req: Request<GetInstallmentParams>,
  res: Response
): Promise<void> => {
  try {
    const userId = (req as any).user.userId;
    const localId = parseInt(req.params.localId);

    if (isNaN(localId)) {
      res.status(400).json({
        success: false,
        error: "Invalid book ID format",
      });
      return;
    }

    const result = await getInstallmentPlan(localId, userId);

    res.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    if (error.message.includes("not found")) {
      res.status(404).json({
        success: false,
        error: error.message,
      });
      return;
    }
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

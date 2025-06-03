import { Request, Response } from "express";
import {
  createInstallmentPlan,
  getInstallmentPlan,
} from "../service/installment.service";

/**
 * InstallmentController handles requests related to book installments.
 */
export class InstallmentController {
  /**
   * Creates a payment installment plan for a specific book.
   *
   * @param req - The request object containing user ID and book ID in the parameters, and the number of installments in the body.
   * @param res - The response object used to send back the desired HTTP response.
   * @returns A promise that resolves to void.
   */
  public async createBookInstallments(
    req: Request,
    res: Response
  ): Promise<void> {
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
  }

  /**
   * Retrieves the installment plan for a specific book.
   *
   * @param req - The request object containing user ID and book ID in the parameters.
   * @param res - The response object used to send back the desired HTTP response.
   * @returns A promise that resolves to void.
   */
  public async getBookInstallments(req: Request, res: Response): Promise<void> {
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
  }
}

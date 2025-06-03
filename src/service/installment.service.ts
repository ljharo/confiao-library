import { Prisma } from "@prisma/client";
import prisma from "../config/prisma";

/**
 * Represents an installment in a payment plan.
 * @interface InstallmentPlan
 * @property {number} number - Installment sequence number (1-based index).
 * @property {number} amount - Payment amount for this installment.
 * @property {"pending" | "paid" | "overdue"} status - Current status of the installment.
 * @property {string} [dueDate] - Optional due date in ISO string format.
 */
interface InstallmentPlan {
  number: number;
  amount: number;
  status: "pending" | "paid" | "overdue";
  dueDate?: string;
}

/**
 * Creates an installment payment plan for a personal book.
 * @async
 * @param {number} bookId - ID of the personal book.
 * @param {number} userId - ID of the user who owns the book.
 * @param {number} numberOfInstallments - Number of installments to create (minimum 1).
 * @returns {Promise<{
 *   id: number,
 *   title: string,
 *   price: number,
 *   numberOfInstallments: number,
 *   installmentAmount: number,
 *   installments: InstallmentPlan[]
 * }>} Updated book data with installment plan details.
 * @throws {Error} If:
 * - Book is not found in user's library
 * - Book price is not set
 * - Number of installments is less than 1
 * @example
 * await createInstallmentPlan(123, 456, 3); // Creates 3 monthly installments
 */
export async function createInstallmentPlan(
  bookId: number,
  userId: number,
  numberOfInstallments: number
) {
  const book = await prisma.personalBook.findUnique({
    where: {
      id: bookId,
      userId,
    },
    select: {
      price: true,
    },
  });

  if (!book) {
    throw new Error("Book not found in your library");
  }

  if (!book.price) {
    throw new Error("Book price is not set");
  }

  if (numberOfInstallments < 1) {
    throw new Error("Number of installments must be at least 1");
  }

  const installmentAmount = book.price / numberOfInstallments;

  // Creamos el array de cuotas como objeto serializable
  const installments = Array.from({ length: numberOfInstallments }, (_, i) => ({
    number: i + 1,
    amount: parseFloat(installmentAmount.toFixed(2)),
    status: "pending" as const,
    dueDate: new Date(
      Date.now() + (i + 1) * 30 * 24 * 60 * 60 * 1000
    ).toISOString(),
  }));

  // Convertimos explícitamente a Prisma.JsonArray
  const installmentsJson = installments as unknown as Prisma.JsonArray;

  return await prisma.personalBook.update({
    where: {
      id: bookId,
      userId,
    },
    data: {
      numberOfInstallments,
      installmentAmount,
      installments: installmentsJson, // Usamos la versión convertida
    },
    select: {
      id: true,
      title: true,
      price: true,
      numberOfInstallments: true,
      installmentAmount: true,
      installments: true,
    },
  });
}

/**
 * Retrieves the installment plan for a personal book.
 * @async
 * @param {number} bookId - ID of the personal book.
 * @param {number} userId - ID of the user who owns the book.
 * @returns {Promise<{
 *   title: string,
 *   price: number,
 *   numberOfInstallments: number,
 *   installmentAmount: number,
 *   installments: InstallmentPlan[]
 * }>} The book's installment plan details.
 * @throws {Error} If:
 * - Book is not found in user's library
 * - Installment plan doesn't exist for this book
 * @example
 * await getInstallmentPlan(123, 456); // Returns existing installment plan
 */
export async function getInstallmentPlan(bookId: number, userId: number) {
  const book = await prisma.personalBook.findUnique({
    where: {
      id: bookId,
      userId,
    },
    select: {
      title: true,
      price: true,
      numberOfInstallments: true,
      installmentAmount: true,
      installments: true,
    },
  });

  if (!book) {
    throw new Error("Book not found in your library");
  }

  if (!book.numberOfInstallments) {
    throw new Error("Installment plan not created for this book");
  }

  // Convertimos los installments al tipo correcto
  const installments = book.installments as unknown as InstallmentPlan[];

  return {
    ...book,
    installments,
  };
}

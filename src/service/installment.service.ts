import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface InstallmentPlan {
  number: number;
  amount: number;
  status: "pending" | "paid" | "overdue";
  dueDate?: string;
}

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

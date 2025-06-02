import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface AuthorData {
  name: string;
  country?: string;
}

export const createAuthor = async (data: AuthorData) => {
  return await prisma.author.create({
    data,
    select: {
      id: true,
      name: true,
      country: true,
      createdAt: true,
    },
  });
};

export const getAllAuthors = async () => {
  return await prisma.author.findMany({
    select: {
      id: true,
      name: true,
      country: true,
    },
    orderBy: {
      name: "asc",
    },
  });
};

export const getAuthorById = async (id: number) => {
  return await prisma.author.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      country: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

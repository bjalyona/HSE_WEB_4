import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createUser = (username: string, hashedPassword: string) => {
  return prisma.user.create({
    data: { username, password: hashedPassword },
  });
};

export const findUserByUsername = (username: string) => {
  return prisma.user.findUnique({ where: { username } });
};

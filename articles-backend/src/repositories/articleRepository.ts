import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface ArticleInput {
  title: string;
  content: string;
  username: string;
  tag: string
}

export const findAll = () => {
  return prisma.article.findMany({
    orderBy: { createdAt: 'desc' },
  });
};

export const findById = (id: number) => {
  return prisma.article.findUnique({ where: { id } });
};

export const create = async (data: ArticleInput, username: string) => {
  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user) {
    throw new Error('User not found');
  }

  return prisma.article.create({
    data: {
      title: data.title,
      content: data.content,
      tag: data.tag,
      likes: 0,               
      userId: user.id,
    },
  });
};

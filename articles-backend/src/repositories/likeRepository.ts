import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class LikeRepository {
  async createLike(userId: number, articleId: number) {
    return prisma.like.create({
      data: { userId, articleId },
    });
  }

  async deleteLike(userId: number, articleId: number) {
    return prisma.like.delete({
      where: { userId_articleId: { userId, articleId } },
    });
  }

  async isLiked(userId: number, articleId: number) {
    return prisma.like.findUnique({
      where: { userId_articleId: { userId, articleId } },
    });
  }

  async incrementArticleLikes(articleId: number) {
    return prisma.article.update({
      where: { id: articleId },
      data: { likesCount: { increment: 1 } },
    });
  }

  async decrementArticleLikes(articleId: number) {
    return prisma.article.update({
      where: { id: articleId },
      data: { likesCount: { decrement: 1 } },
    });
  }
}

import { LikeRepository } from '../repositories/likeRepository';

const likeRepo = new LikeRepository();

export class LikeService {
  async likeArticle(userId: number, articleId: number) {
    const existing = await likeRepo.isLiked(userId, articleId);
    if (existing) {
      throw new Error('Article already liked');
    }

    await likeRepo.createLike(userId, articleId);
    await likeRepo.incrementArticleLikes(articleId);
  }

  async unlikeArticle(userId: number, articleId: number) {
    const existing = await likeRepo.isLiked(userId, articleId);
    if (!existing) {
      throw new Error('Like not found');
    }

    await likeRepo.deleteLike(userId, articleId);
    await likeRepo.decrementArticleLikes(articleId);
  }

  async isArticleLiked(userId: number, articleId: number) {
    const like = await likeRepo.isLiked(userId, articleId);
    return !!like;
  }
}

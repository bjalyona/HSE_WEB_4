import { NextFunction, Request, Response } from 'express'
import * as articleService from '../services/articleService'

export const getAllArticles = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const articles = await articleService.getAllArticles()
		res.json(articles)
	} catch (err) {
		next(err)
	}
}

export const createArticle = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { title, content, tag } = req.body
		const username = (req as Request & { user?: { username: string } }).user
			?.username

		if (!username) {
			res.status(401).json({ error: 'Unauthorized: username missing' })
			return
		}

		const article = await articleService.createArticle(
			{ title, content, username, tag },
			username
		)
		res.status(201).json(article)
	} catch (err) {
		next(err)
	}
}

export const getArticleById = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { id } = req.params
		const article = await articleService.getArticleById(Number(id))

		if (!article) {
			res.status(404).json({ message: 'Article not found' })
			return
		}

		res.json(article)
	} catch (err) {
		next(err)
	}
}

export const getArticleByUserID = async (req: Request, res: Response) => {
	const userID = Number(req.params.id)
	const articles = await articleService.getArticlesByUserId(userID)
	res.json(articles)
}

export const getArticleByTag = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { tag } = req.params
		const articles = await articleService.getArticleByTag(tag)
		res.json(articles)
	} catch (err) {
		next(err)
	}
}

export const deleteArticleByID = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { id } = req.params
		const result = await articleService.deleteArticleById(Number(id))
		res.sendStatus(200)
	} catch (err) {
		next(err)
	}
}

export const updateArticleById = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { id } = req.params
		const { title, content, tag } = req.body

		const updatedArticle = await articleService.updateArticleById(Number(id), {
			title,
			content,
			tag,
		})

		res.json(updatedArticle)
	} catch (err: any) {
		if (err.code === 'P2025') {
			res.status(404).json({ error: 'Article not found' })
			return
		}
		next(err)
	}
}

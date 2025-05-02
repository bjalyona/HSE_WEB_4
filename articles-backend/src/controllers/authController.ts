import { NextFunction, Request, Response } from 'express'
import * as authService from '../services/authService'

export const getAllUsers = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const articles = await authService.getAllUsers()
		res.json(articles)
	} catch (err) {
		next(err)
	}
}

export const getUserById = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { id } = req.params
		const article = await authService.getUserById(Number(id))

		if (!article) {
			res.status(404).json({ message: 'User not found' })
			return
		}

		res.json(article)
	} catch (err) {
		next(err)
	}
}

export const register = async (req: Request, res: Response) => {
	const { username, password } = req.body
	try {
		const user = await authService.register(username, password)
		res.status(201).json({ id: user.id, username: user.username })
	} catch (err: any) {
		res.status(400).json({ error: err.message })
	}
}

export const registerTG = async (req: Request, res: Response) => {
	const { username } = req.body
	try {
		const user = await authService.register(username, '')
		res.status(201).json({ id: user.id, username: user.username })
	} catch (err: any) {
		res.status(400).json({ error: err.message })
	}
}

export const login = async (req: Request, res: Response) => {
	const { username, password } = req.body
	try {
		const result = await authService.login(username, password)
		res.cookie('token', result.token, {
			httpOnly: true,
			secure: false,
			sameSite: 'strict',
			maxAge: 7 * 24 * 60 * 60 * 1000,
		})
		res.json(result)
	} catch (err: any) {
		res.status(401).json({ error: err.message })
	}
}

export const deleteUserByID = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { id } = req.params
		const result = await authService.deleteUserById(Number(id))
		res.sendStatus(200)
	} catch (err) {
		next(err)
	}
}

export const updateUserById = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { id } = req.params
		const { username, password } = req.body

		const updatedUser = await authService.updateUserById(Number(id), {
			username: username,
			password: password,
		})

		res.json(updatedUser)
	} catch (err: any) {
		if (err.code === 'P2025') {
			res.status(404).json({ error: 'User not found' })
			return
		}
		next(err)
	}
}

import { Request, Response } from 'express'
import * as authService from '../services/authService'

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

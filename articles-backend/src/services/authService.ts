import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import * as userRepository from '../repositories/userRepository'

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret'

interface UserInput {
	username: string
	password: string
}

export const getAllUsers = () => {
	return userRepository.findAll()
}

export const getUserById = (id: number) => {
	return userRepository.findById(id)
}

export const register = async (username: string, password: string) => {
	const hashedPassword = await bcrypt.hash(password, 10)
	const user = await userRepository.createUser(username, hashedPassword)
	return user
}

export const login = async (username: string, password: string) => {
	const user = await userRepository.findUserByUsername(username)
	if (!user) {
		throw new Error('User not found')
	}

	const isPasswordValid = await bcrypt.compare(password, user.password)
	if (!isPasswordValid) {
		throw new Error('Invalid credentials')
	}

	const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
		expiresIn: '7d',
	})

	return { token }
}

export const verifyToken = (token: string) => {
	return jwt.verify(token, JWT_SECRET)
}

export const deleteUserById = (id: number) => {
	return userRepository.deleteByID(id)
}

export const updateUserById = (id: number, data: Partial<UserInput>) => {
	return userRepository.updateByID(id, data)
}

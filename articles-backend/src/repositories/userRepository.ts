import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface UserInput {
	username: string
	password: string
}

export const findAll = () => {
	return prisma.user.findMany({
		orderBy: { createdAt: 'asc' },
	})
}

export const findById = (id: number) => {
	return prisma.user.findUnique({ where: { id } })
}

export const createUser = (username: string, hashedPassword: string) => {
	return prisma.user.create({
		data: { username, password: hashedPassword },
	})
}

export const findUserByUsername = (username: string) => {
	return prisma.user.findUnique({ where: { username } })
}

export const deleteByID = async (id: number) => {
	return prisma.user.delete({
		where: { id },
	})
}

export const updateByID = async (id: number, data: Partial<UserInput>) => {
	return prisma.user.update({
		where: { id },
		data: {
			username: data.username,
			password: data.password,
		},
	})
}

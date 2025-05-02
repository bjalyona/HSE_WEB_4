import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface ArticleInput {
	title: string
	content: string
	username: string
	tag: string
}

export const findAll = () => {
	return prisma.article.findMany({
		orderBy: { createdAt: 'asc' },
	})
}

export const findById = (id: number) => {
	return prisma.article.findUnique({ where: { id } })
}

export const create = async (data: ArticleInput, username: string) => {
	const user = await prisma.user.findUnique({
		where: { username },
	})

	if (!user) {
		throw new Error('User not found')
	}

	return prisma.article.create({
		data: {
			title: data.title,
			content: data.content,
			tag: data.tag,
			likesCount: 0,
			userId: user.id,
		},
	})
}

export const findByUserID = async (userId: number) => {
	return prisma.article.findMany({
		where: { userId },
	})
}

export const findByTag = async (tag: string) => {
	return prisma.article.findMany({
		where: { tag },
	})
}

export const deleteByID = async (id: number) => {
	return prisma.article.delete({
		where: { id },
	})
}

export const updateByID = async (id: number, data: Partial<ArticleInput>) => {
	return prisma.article.update({
		where: { id },
		data: {
			title: data.title,
			content: data.content,
			tag: data.tag,
		},
	})
}

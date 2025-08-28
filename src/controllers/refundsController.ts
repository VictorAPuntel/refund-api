import { Request, Response } from 'express'
import { z } from 'zod'
import { prisma } from '@/database/prisma'
import { AppError } from '@/utils/AppError'

const CategoriesEnum = z.enum([
  'food',
  'others',
  'services',
  'transport',
  'accommodation',
])
class RefundsController {
  async index(request: Request, response: Response) {
    const queryschema = z.object({
      name: z.string().optional().default(''),
    })

    const { name } = queryschema.parse(request.query)

    const refunds = await prisma.refunds.findMany({
      where: {
        user: {
          name: {
            contains: name.trim(),
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      include: { user: true },
    })

    response.json(refunds)
  }
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      name: z
        .string()
        .trim()
        .min(1, { message: 'Inform the name of requisition' }),
      category: CategoriesEnum,
      amount: z.number().positive({ message: 'The value must be positive' }),
      filename: z.string().min(20),
    })

    const { name, category, amount, filename } = bodySchema.parse(request.body)

    if (!request.user?.id) {
      throw new AppError('User not have authorization')
    }

    const refund = await prisma.refunds.create({
      data: {
        name,
        category,
        amount,
        filename,
        userId: request.user?.id,
      },
    })

    response.status(201).json(refund)
  }
}

export { RefundsController }

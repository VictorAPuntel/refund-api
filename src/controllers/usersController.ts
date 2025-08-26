import { Request, Response } from 'express'
import { z } from 'zod'
import { UserRole } from '@prisma/client'
import { prisma } from '@/database/prisma'
import { appError } from '@/utils/AppError'
import { hash } from 'bcrypt'

class UsersController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      name: z.string().trim().min(2, { message: 'Name is required' }),
      email: z
        .string()
        .trim()
        .email({ message: 'Invalid email' })
        .toLowerCase(),
      password: z
        .string()
        .min(6, { message: 'The password must have minimum 6 digits' }),
      role: z
        .enum([UserRole.employee, UserRole.manager])
        .default(UserRole.employee),
    })

    const { name, email, password, role } = bodySchema.parse(request.body)

    const userWithSameEmail = await prisma.user.findFirst({ where: { email } })

    if (userWithSameEmail) {
      throw new appError('Already exists a user with this email')
    }

    const hashedPassword = await hash(password, 8)

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    })

    response.status(201).json()
  }
}

export { UsersController }

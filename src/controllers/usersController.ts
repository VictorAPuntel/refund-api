import { Request, Response } from 'express'
import { z } from 'zod'
import { UserRole } from '@prisma/client'

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

    return response.json({ message: 'ok' })
  }
}

export { UsersController }

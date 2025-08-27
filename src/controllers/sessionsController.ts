import { AppError } from '@/utils/AppError'
import { Request, Response } from 'express'
import { authConfig } from '@/configs/auth'
import { prisma } from '@/database/prisma'
import { sign } from 'jsonwebtoken'
import { compare } from 'bcrypt'
import { z } from 'zod'

class SessionsController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      email: z.string().email({ message: 'Invalid email' }),
      password: z.string(),
    })

    const { email, password } = bodySchema.parse(request.body)

    const user = await prisma.user.findFirst({ where: { email } })

    if (!user) {
      throw new AppError('Email or password is invalid', 401)
    }

    const passwordMatched = await compare(password, user.password)

    if (!passwordMatched) {
      throw new AppError('Email or password is invalid', 401)
    }

    const { secret, expiresIn } = authConfig.jwt

    const token = sign({ role: user.role }, secret, {
      subject: user.id,
      expiresIn,
    })

    const { password: _, ...userWithoutPassword } = user

    response.json({ token, user: userWithoutPassword })
  }
}

export { SessionsController }

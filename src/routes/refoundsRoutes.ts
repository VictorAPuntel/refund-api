import { Router } from 'express'
import { RefundsController } from '@/controllers/refundsController'
import { verifyUserAuthorization } from '@/middlewares/verifyUserAuthorization'

const refoundsRoutes = Router()
const refundsController = new RefundsController()

refoundsRoutes.post(
  '/',
  verifyUserAuthorization(['employee']),
  refundsController.create
)

export { refoundsRoutes }

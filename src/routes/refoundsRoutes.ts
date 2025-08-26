import { Router } from 'express'
import { RefundsController } from '@/controllers/refundsController'

const refoundsRoutes = Router()
const refundsController = new RefundsController()

refoundsRoutes.post('/', refundsController.create)

export { refoundsRoutes }

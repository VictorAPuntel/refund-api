import { Router } from 'express'
import { UploadsController } from '@/controllers/uploadsController'
import { verifyUserAuthorization } from '@/middlewares/verifyUserAuthorization'

const uploadsRouter = Router()
const uploadsController = new UploadsController()

uploadsRouter.use(verifyUserAuthorization(['employee']))
uploadsRouter.post('/', uploadsController.create)

export { uploadsRouter }

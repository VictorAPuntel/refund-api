import { Router } from 'express'
import { UploadsController } from '@/controllers/uploadsController'
import { verifyUserAuthorization } from '@/middlewares/verifyUserAuthorization'
import multer from 'multer'
import uploadConfig from '@/configs/upload'

const uploadsRouter = Router()
const uploadsController = new UploadsController()

const upload = multer(uploadConfig.MULTER)

uploadsRouter.use(verifyUserAuthorization(['employee']))
uploadsRouter.post('/', upload.single('file'), uploadsController.create)

export { uploadsRouter }

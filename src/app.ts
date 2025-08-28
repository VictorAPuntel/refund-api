import 'express-async-errors'
import cors from 'cors'
import express from 'express'
import { errorHandling } from './middlewares/errorHandling'
import { routes } from './routes'
import uploadConfig from './configs/upload'

const app = express()
app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(uploadConfig.UPLOADS_FOLDER))

//Using the new routes
app.use(routes)
app.use(errorHandling)

export { app }

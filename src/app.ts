import 'express-async-errors'
import cors from 'cors'
import express from 'express'
import { errorHandling } from './middlewares/errorHandling'
import { routes } from './routes'

const app = express()
app.use(cors())
app.use(express.json())

//Using the new routes
app.use(routes)
app.use(errorHandling)

export { app }

import { Router } from 'express'
import { usersRoutes } from './usersRoutes'

const routes = Router()

//Public Routes
routes.use('/users', usersRoutes)

export { routes }

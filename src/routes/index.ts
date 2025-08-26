import { Router } from 'express'
import { usersRoutes } from './usersRoutes'
import { sessionsRoutes } from './sessionsRoutes'

const routes = Router()

//Public Routes
routes.use('/users', usersRoutes)
routes.use('/sessions', usersRoutes)

export { routes }

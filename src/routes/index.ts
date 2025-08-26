import { Router } from 'express'
import { usersRoutes } from './usersRoutes'
import { sessionsRoutes } from './sessionsRoutes'
import { refoundsRoutes } from './refoundsRoutes'

const routes = Router()

//Public Routes
routes.use('/users', usersRoutes)
routes.use('/sessions', sessionsRoutes)

//Private Routes
routes.use('/refounds', refoundsRoutes)

export { routes }

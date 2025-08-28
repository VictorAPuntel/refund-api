import { Router } from 'express'
import { usersRoutes } from './usersRoutes'
import { sessionsRoutes } from './sessionsRoutes'
import { refoundsRoutes } from './refoundsRoutes'
import { uploadsRouter } from './uploadsRouter'
import { ensureAuthenticated } from '@/middlewares/endureAuthenticated'

const routes = Router()

//Public Routes
routes.use('/users', usersRoutes)
routes.use('/sessions', sessionsRoutes)

//Private Routes
routes.use(ensureAuthenticated)
routes.use('/refounds', refoundsRoutes)
routes.use('/uploads', uploadsRouter)

export { routes }

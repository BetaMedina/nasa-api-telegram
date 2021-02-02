import express from 'express'
import setupRoutes from './routes'
import setupMiddlewares from './middlewares'
import cron from '../cron/telegram-cron'

const app = express()
setupMiddlewares(app)
setupRoutes(app)
cron()

export default app

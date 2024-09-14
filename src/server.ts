import cors from 'cors'
import express from 'express'
import { envs } from './config'
import { logger } from './utils'
import { connectDB } from './database'
import { authRoutes } from './routes'
export class Server {
  private app: express.Application
  constructor() {
    this.app = express()
    this.database()
    this.middleware()
    this.routes()
    this.errorHandling()
  }

  start(): void {
    this.app.listen(envs.port, () =>
      logger.info(`Server running on port ${envs.port}`),
    )
  }

  routes(): void {
    this.app.use('/api/auth', authRoutes)
  }

  database(): void {
    connectDB()
  }

  middleware(): void {
    this.app.use(express.json())
    this.app.use(cors())
    logger.info('Middleware configured')
  }

  errorHandling() {
    logger.info('Error handling configured')
  }
}

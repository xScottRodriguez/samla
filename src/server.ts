import cors from 'cors'
import express from 'express'
import { envs } from './config'
import { logger } from './utils'
import { connectDB } from './database'
import { authRoutes } from './routes'
import { errorHandler } from './middlewares'
export class Server {
  private app: express.Application
  constructor() {
    this.app = express()
    this.database()
    this.middleware()
    this.routes()
    this.errorHandling()
  }

  public start(): void {
    try {
      this.app.listen(envs.port, () =>
        logger.info(`Server running on port ${envs.port}`),
      )
    } catch (error) {
      logger.error('Error starting the server:', error)
      process.exit(1)
    }
  }

  private async database(): Promise<void> {
    try {
      await connectDB()
    } catch (error) {
      logger.error('Error connecting to the database:', error)
      process.exit(1)
    }
  }
  private middleware(): void {
    this.app.use(express.json())
    this.app.use(cors())
    logger.info('Middleware configured')
  }

  private routes(): void {
    this.app.use('/api/auth', authRoutes)
    logger.info('Routes configured')
  }

  private errorHandling(): void {
    this.app.use(errorHandler)
  }
}

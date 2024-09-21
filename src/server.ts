import cors from 'cors'
import express from 'express'
import passport from 'passport'

import { configurePassport, envs } from './config'
import { connectDB } from './database'
import { errorHandler } from './middlewares'
import { authRoutes } from './routes'
import { seeder } from './seeders'
import { logger } from './utils'
export class Server {
  private app: express.Application
  constructor() {
    this.app = express()
    this.database()
    this.middleware()
    this.routes()
    this.errorHandling()
    configurePassport()

    this.seedData()
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
    this.app.use(express.urlencoded({ extended: false }))
    this.app.use(express.json())
    this.app.use(
      cors({
        origin: '*',
      }),
    )
    this.app.use(passport.initialize())
  }

  private routes(): void {
    this.app.use('/api/auth', authRoutes)
  }

  private errorHandling(): void {
    this.app.use(errorHandler)
  }

  private seedData(): void {
    seeder.seedAll()
  }
}

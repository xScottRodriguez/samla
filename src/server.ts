import express, { Application } from 'express'
import cors from 'cors'

import { envs } from '@config/'
import { logger } from '@utils/index'

export class Server {
  private app: Application
  constructor() {
    this.app = express()
    this.middleware()
    this.routes()
    this.database()
    this.errorHandling()
  }

  start() {
    logger.info('Server starting')

    this.app.listen(envs.port, () =>
      logger.info(`Server running on port ${envs.port}`),
    )
  }

  stop() {
    logger.info('Server stopped')
  }

  routes() {
    logger.info('Routes configured')
  }

  database() {
    logger.info('Database configured')
  }

  middleware() {
    logger.info('Middleware configured')

    this.app.use(express.json())
    this.app.use(cors)
  }

  errorHandling() {
    logger.info('Error handling configured')
  }
}

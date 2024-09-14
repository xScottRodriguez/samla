import { authController } from '../controllers'
import { logger } from '../utils'
import { Router } from 'express'

class AuthRoutes {
  public router: Router

  constructor() {
    this.router = Router()
    this.routes()
  }
  public routes(): void {
    this.router.get('/register', authController.register)
    this.router.get('/login', authController.login)
  }
}

export default new AuthRoutes().router

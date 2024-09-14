import { validateFields } from '../middlewares'
import { authController } from '../controllers'
import { Router } from 'express'
import { RegistrationSchema } from './validations'
import { IRegistrationRequest } from 'interfaces'

class AuthRoutes {
  public router: Router

  constructor() {
    this.router = Router()
    this.routes()
  }
  public routes(): void {
    this.router.post(
      '/register',
      [validateFields<IRegistrationRequest>(RegistrationSchema)],
      authController.register,
    )
    this.router.post('/login', authController.login)
  }
}

export default new AuthRoutes().router

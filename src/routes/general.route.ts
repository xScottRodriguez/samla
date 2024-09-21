import { Router } from 'express'
import passport from 'passport'

import { generalController } from '../controllers'

class GeneralRoute {
  public router: Router

  constructor() {
    this.router = Router()
    this.init()
  }

  private init() {
    this.router.get(
      '/documents',
      [passport.authenticate('jwt', { session: false })],
      generalController.documents,
    )
    this.router.get(
      '/departments',
      [passport.authenticate('jwt', { session: false })],
      generalController.documents,
    )
    this.router.get('/municipalities', generalController.municipalities)
  }
}

export const generalRoute = new GeneralRoute().router

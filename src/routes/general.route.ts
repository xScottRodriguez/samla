import { Router } from 'express'

import { generalController } from '../controllers'
import { Source, validateFields } from '../middlewares'
import { queryparams } from './validations'

class GeneralRoute {
  public router: Router

  constructor() {
    this.router = Router()
    this.init()
  }

  private init() {
    this.router.get('/documents', generalController.documents)
    this.router.get('/departments', generalController.departments)
    this.router.get(
      '/municipalities',
      [validateFields(queryparams, Source.QUERY)],
      generalController.municipalities,
    )
  }
}

export const generalRoute = new GeneralRoute().router

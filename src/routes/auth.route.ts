import { Router } from 'express'
import { IRegistrationRequest } from 'interfaces'
import multer from 'multer'
import passport from 'passport'

import { tenMegas } from '../config'
import { authController } from '../controllers'
import { validateFields } from '../middlewares'
import { loginSchema, RegistrationSchema } from './validations'
import { paginationSchema } from './validations/pagination.validation'

const upload = multer({
  storage: multer.memoryStorage(),
  dest: 'uploads/',
  fileFilter: (req, file, cb) => {
    // Validate file type
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
      cb(null, true) // Accept the file
    else cb(null, false) // Reject the file
  },
  limits: {
    fileSize: tenMegas,
  },
})
class AuthRoutes {
  public router: Router

  constructor() {
    this.router = Router()
    this.routes()
  }
  public routes(): void {
    this.router.post(
      '/register',
      [
        upload.fields([
          { name: 'identificationFront', maxCount: 1 },
          { name: 'identificationBack', maxCount: 1 },
          { name: 'selfie', maxCount: 1 },
        ]),
        validateFields<IRegistrationRequest>(RegistrationSchema),
      ],
      authController.register,
    )
    this.router.post(
      '/login',
      validateFields(loginSchema),
      authController.login,
    )
    this.router.get(
      '/registration-requests',
      [passport.authenticate('jwt', { session: false })],
      [validateFields(paginationSchema)],
      authController.getRegistrationRequests,
    )
  }
}

export default new AuthRoutes().router

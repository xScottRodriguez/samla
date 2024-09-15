import { validateFields } from '../middlewares'
import { authController } from '../controllers'
import { NextFunction, Request, Response, Router } from 'express'
import { RegistrationSchema } from './validations'
import { IRegistrationRequest } from 'interfaces'
import multer from 'multer'
import { tenMegas } from '../config'
import { ApiError, HttpStatusMessage } from '../errors'
import { logger } from '../utils'

const upload = multer({
  storage: multer.memoryStorage(),
  dest: 'uploads/',
  fileFilter: (req, file, cb) => {
    // Validate file type
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true) // Accept the file
    } else {
      cb(null, false) // Reject the file
    }
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
    this.router.post('/login', authController.login)
  }
}

export default new AuthRoutes().router

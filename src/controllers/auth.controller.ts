import { NextFunction, Request, Response } from 'express'
import { authService } from '../services'
import { logger, normalizedFiles, successResponse } from '../utils'
import { HttpStatusCode } from '../errors'
import { TNormalizedFiles } from 'interfaces'

type TFiles =
  | {
      [fieldname: string]: Express.Multer.File[]
    }
  | Express.Multer.File[]
  | undefined
class AuthController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      // const data = authService.registry(req.body)
      return successResponse({
        res,
        data: null,
        message: 'User registered successfully',
        statusCode: HttpStatusCode.Created,
      })
    } catch (error) {
      next(error)
    }
  }
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { files } = req
      const filesNormalized = normalizedFiles(files)

      const data = await authService.registry(req.body, filesNormalized)
      return successResponse({
        res,
        data,
        message: 'Registro creado exitosamente',
        statusCode: HttpStatusCode.Created,
      })
    } catch (error) {
      next(error)
    }
  }
}

export default new AuthController()

import { NextFunction, Request, Response } from 'express'
import { authService } from '../services'
import { successResponse } from '../utils'
import { HttpStatusCode } from '../errors'

class AuthController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const data = authService.registry(req.body)
      return successResponse({
        res,
        data,
        message: 'User registered successfully',
        statusCode: HttpStatusCode.Created,
      })
    } catch (error) {
      next(error)
    }
  }
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await authService.registry(req.body)
      return successResponse({
        res,
        data,
        message: 'User registered successfully',
        statusCode: HttpStatusCode.Created,
      })
    } catch (error) {
      next(error)
    }
  }
}

export default new AuthController()

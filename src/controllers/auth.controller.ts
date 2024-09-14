import { Request, Response } from 'express'
import { authService } from '../services'
import { successResponse } from '../utils'
import { HttpStatusCode } from '../errors'

class AuthController {
  async login(req: Request, res: Response) {
    const data = authService.registry(req.body)
    return successResponse({
      res,
      data,
      message: 'User registered successfully',
      statusCode: HttpStatusCode.Created,
    })
  }
  register(req: Request, res: Response) {
    const data = authService.registry(req.body)
    return successResponse({
      res,
      data,
      message: 'User registered successfully',
      statusCode: HttpStatusCode.Created,
    })
  }
}

export default new AuthController()

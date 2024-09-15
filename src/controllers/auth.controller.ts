import { NextFunction, Request, Response } from 'express'
import { IDataToSave, IPagination, IPaginationQuery } from 'interfaces'

import { HttpStatusCode } from '../errors'
import { authService } from '../services'
import { normalizedFiles, SuccessResponse } from '../utils'

class AuthController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      // const data = authService.registry(req.body)
      return SuccessResponse({
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
      return SuccessResponse({
        res,
        data,
        message: 'Registro creado exitosamente',
        statusCode: HttpStatusCode.Created,
      })
    } catch (error) {
      next(error)
    }
  }

  async getRegistrationRequests(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const {
        limit,
        page: pageFilter,
        filters,
      } = req.query as unknown as IPaginationQuery

      const { data, page, total }: IPagination<IDataToSave> =
        await authService.getRegistrationRequests({
          limit: Number(limit),
          page: Number(pageFilter),
          filters,
        })

      return SuccessResponse({
        res,
        data,
        meta: {
          page,
          total,
        },
        message: 'Registros obtenidos exitosamente',
        statusCode: HttpStatusCode.OK,
      })
    } catch (error) {
      next(error)
    }
  }
}

export default new AuthController()

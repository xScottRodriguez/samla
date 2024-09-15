import { NextFunction, Request, Response } from 'express'
import { authService } from '../services'
import { logger, normalizedFiles, pageBuilder, successResponse } from '../utils'
import { HttpStatusCode } from '../errors'
import {
  IDataToSave,
  IPagination,
  IPaginationQuery,
  IRegistrationRequest,
  TNormalizedFiles,
} from 'interfaces'

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

      return successResponse({
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

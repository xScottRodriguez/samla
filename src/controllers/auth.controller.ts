import { NextFunction, Request, Response } from 'express'
import { IDataToSave, IPagination, IPaginationQuery } from 'interfaces'
import jwt from 'jsonwebtoken'

import { envs } from '../config'
import { ApiError, HttpStatusCode } from '../errors'
import { Auth } from '../models'
import { authService } from '../services'
import { logger, normalizedFiles, SuccessResponse } from '../utils'
interface ICredentials {
  email: string
  password: string
}
class AuthController {
  async login(req: Request, res: Response, _next: NextFunction) {
    const body = req.body as ICredentials
    const user = await Auth.findOne({
      email: body.email,
      password: body.password,
    }).exec()

    if (!user) throw ApiError.unauthorized('Credenciales incorrectas')

    const token = jwt.sign(
      { id: user._id, email: user.email },
      envs.jwtSecret,
      {
        expiresIn: '1h', // El token expira en 1 hora
      },
    )

    const userJson = user.toJSON()
    const userSerialized = {
      id: userJson._id,
      email: userJson.email,
    }
    return SuccessResponse({
      res,
      data: {
        user: userSerialized,
        token,
      },
      message: 'Usuario obtenido exitosamente',
      statusCode: HttpStatusCode.OK,
    })
  }
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { files } = req

      if (!files || Object.keys(files).length === 0)
        throw ApiError.badRequest('No se cargaron archivos')

      const filesNormalized = normalizedFiles(files)

      const data = await authService.registry(req.body, filesNormalized)
      return SuccessResponse({
        res,
        data,
        message: 'Registro creado exitosamente',
        statusCode: HttpStatusCode.Created,
      })
    } catch (error) {
      logger.debug('Error en el registro:', error)
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

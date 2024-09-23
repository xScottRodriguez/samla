import { NextFunction, Request, Response } from 'express'

import { HttpStatusCode } from '../errors'
import { generalService } from '../services'
import { SuccessResponse } from '../utils'

class GeneralController {
  async documents(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await generalService.documents()
      return SuccessResponse({
        res,
        data,
        message: 'Documentos obtenidos exitosamente',
        statusCode: HttpStatusCode.OK,
      })
    } catch (error) {
      next(error)
    }
  }
  async departments(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await generalService.departments()
      return SuccessResponse({
        res,
        data,
        message: 'Departamentos obtenidos exitosamente',
        statusCode: HttpStatusCode.OK,
      })
    } catch (error) {
      next(error)
    }
  }
  async municipalities(req: Request, res: Response, next: NextFunction) {
    try {
      const { departmentId = '' } = req.query
      const data = await generalService.municipality(departmentId as string)
      return SuccessResponse({
        res,
        data,
        message: 'Municipios obtenidos exitosamente',
        statusCode: HttpStatusCode.OK,
      })
    } catch (error) {
      next(error)
    }
  }
}

export default new GeneralController()

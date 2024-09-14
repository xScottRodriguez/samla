import { errorResponse } from '../utils'
import { HttpStatusMessage } from '../errors'
import { NextFunction, Request, Response } from 'express'

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  return errorResponse({
    errors: [{ msg: err.message, path: '' }],
    message: HttpStatusMessage.InternalServerError,
    statusCode: res.statusCode,
    res,
  })
}

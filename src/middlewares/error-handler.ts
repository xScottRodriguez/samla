import { errorResponse } from '../utils'
import { ApiError, HttpStatusMessage } from '../errors'
import { NextFunction, Request, Response } from 'express'

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof ApiError) {
    return errorResponse({
      errors: err.errors,
      message: err.message,
      statusCode: err.status,
      res,
    })
  }
  return errorResponse({
    errors: [{ msg: err.message, path: '' }],
    message: HttpStatusMessage.InternalServerError,
    statusCode: res.statusCode,
    res,
  })
}

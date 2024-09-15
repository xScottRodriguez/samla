import { NextFunction, Request, Response } from 'express'

import { ApiError, HttpStatusMessage } from '../errors'
import { ErrorResponse } from '../utils'

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,

  _next: NextFunction,
) => {
  if (err instanceof ApiError)
    return ErrorResponse({
      errors: err.errors,
      message: err.message,
      statusCode: err.status,
      res,
    })

  return ErrorResponse({
    errors: [{ msg: err.message, path: '' }],
    message: HttpStatusMessage.InternalServerError,
    statusCode: res.statusCode,
    res,
  })
}

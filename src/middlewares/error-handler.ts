import { NextFunction, Request, Response } from 'express'

import { ApiError, HttpStatusMessage } from '../errors'
import { ErrorResponse, logger } from '../utils'

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,

  _next: NextFunction,
) => {
  logger.error({
    message: err.message,
    method: req.method,
    url: req.originalUrl,
    body: req.body,
    params: req.params,
    query: req.query,
    headers: req.headers,
    stack:
      process.env.NODE_ENV === 'development'
        ? err.stack
        : 'Enable NODE_ENV=development to see the stack trace',
  })
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

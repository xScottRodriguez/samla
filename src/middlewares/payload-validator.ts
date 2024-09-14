import { errorResponse, logger } from '../utils'
import { HttpStatusCode, HttpStatusMessage } from '../errors'
import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'

enum Source {
  BODY = 'body',
  QUERY = 'query',
}

const validateFields = <T>(
  rules: Joi.ObjectSchema<T>,
  sourceType: Source = Source.BODY,
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!Object.values(Source).includes(sourceType)) {
      return errorResponse({
        message: 'Invalid Source Specified',
        res,
        statusCode: HttpStatusCode.BadRequest,
        errors: [],
      })
    }

    const { error } = rules.validate(req[sourceType], { abortEarly: false })

    if (error?.details?.length) {
      const errors = error.details.map((e) => ({
        msg: e.message,
        path: e.path.join('.'),
      }))

      return errorResponse({
        errors,
        message: HttpStatusMessage.BadRequest,
        res,
        statusCode: HttpStatusCode.BadRequest,
      })
    }

    next()
  }
}

export { validateFields }

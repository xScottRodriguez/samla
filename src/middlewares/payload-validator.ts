import { errorResponse } from '../utils'
import { HttpStatusCode, HttpStatusMessage } from '../errors'
import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'

enum Source {
  BODY = 'body',
  QUERY = 'query',
}

const validateFields = <T>(rules: Joi.Schema<T>, sourceType = Source.BODY) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!(sourceType in Source)) {
      throw new Error('Invalid Source Specified')
    }
    const schema: Joi.ObjectSchema<T> = Joi.object(rules).required()
    const { error } = schema.validate(req[sourceType], { abortEarly: false })

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
  }
}

export { validateFields }

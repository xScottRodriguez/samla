// src/errors/ApiError.ts

import { HttpStatusCode, HttpStatusMessage } from './http-status-codes'

export class ApiError extends Error {
  status: number
  errors: { msg: string; path?: string }[]

  constructor(
    status: number,
    message: string,
    errors: { msg: string; path?: string }[] = [],
  ) {
    super(message)
    this.status = status
    this.errors = errors
    Object.setPrototypeOf(this, new.target.prototype)
    Error.captureStackTrace(this)
  }

  static notFound(
    message: string,
    errors: { msg: string; path?: string }[] = [],
  ) {
    return new ApiError(HttpStatusCode.NotFound, message, errors)
  }

  static badRequest(
    message: string,
    errors: { msg: string; path?: string }[] = [],
  ) {
    return new ApiError(HttpStatusCode.BadRequest, message, errors)
  }

  static conflict(
    message: string,
    errors: { msg: string; path?: string }[] = [],
  ) {
    return new ApiError(HttpStatusCode.Conflict, message, errors)
  }

  static forbidden(
    message: string,
    errors: { msg: string; path?: string }[] = [],
  ) {
    return new ApiError(HttpStatusCode.Forbidden, message, errors)
  }

  static internalServer(
    message: string,
    errors: { msg: string; path?: string }[] = [],
  ) {
    return new ApiError(HttpStatusCode.InternalServerError, message, errors)
  }

  static unauthorized(
    message: string,
    errors: { msg: string; path?: string }[] = [],
  ) {
    console.log({ message })
    return new ApiError(
      HttpStatusCode.Unauthorized,
      message.length ? message : HttpStatusMessage.Unauthorized,
      errors,
    )
  }
}

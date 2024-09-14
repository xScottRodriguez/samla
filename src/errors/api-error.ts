// src/errors/ApiError.ts

import { HttpStatusCode, HttpStatusMessage } from './http-status-codes'

export class ApiError extends Error {
  status: number
  errors: string[]

  constructor(status: number, message: string, errors: string[] = []) {
    super(message)
    this.status = status
    this.errors = errors
    Object.setPrototypeOf(this, new.target.prototype) // Fijar el prototipo para que funcione bien con instanceof
    Error.captureStackTrace(this) // Capturar el stack trace
  }

  static notFound(message = HttpStatusMessage.NotFound, errors: string[]) {
    throw new ApiError(HttpStatusCode.NotFound, message, errors)
  }

  static badRequest(message: HttpStatusMessage.BadRequest, errors: string[]) {
    throw new ApiError(HttpStatusCode.BadRequest, message, errors)
  }
  static conflic(message: HttpStatusMessage.Conflict, errors: string[]) {
    throw new ApiError(HttpStatusCode.Conflict, message, errors)
  }

  static forbidden(message: HttpStatusMessage.Forbidden, errors: string[]) {
    throw new ApiError(HttpStatusCode.Forbidden, message, errors)
  }
}

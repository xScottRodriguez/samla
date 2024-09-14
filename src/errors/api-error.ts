// src/errors/ApiError.ts

import { HttpStatusCode } from './http-status-codes'

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

  static notFound(message: string, errors: string[] = []) {
    return new ApiError(HttpStatusCode.NotFound, message, errors)
  }

  static badRequest(message: string, errors: string[] = []) {
    return new ApiError(HttpStatusCode.BadRequest, message, errors)
  }

  static conflict(message: string, errors: string[] = []) {
    return new ApiError(HttpStatusCode.Conflict, message, errors)
  }

  static forbidden(message: string, errors: string[] = []) {
    return new ApiError(HttpStatusCode.Forbidden, message, errors)
  }

  static internalServer(message: string, errors: string[] = []) {
    return new ApiError(HttpStatusCode.InternalServerError, message, errors)
  }
}

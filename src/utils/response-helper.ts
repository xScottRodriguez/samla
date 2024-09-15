import { IPagination } from 'interfaces'
import { HttpStatusCode, HttpStatusMessage } from '../errors'
import { Response } from 'express'

// Tipos para la paginación

type StatusSuccess =
  | HttpStatusCode.OK
  | HttpStatusCode.Created
  | HttpStatusCode.Accepted
  | HttpStatusCode.NoContent
  | HttpStatusCode.MovedPermanently
  | HttpStatusCode.Found
type StatusError = Exclude<HttpStatusCode, StatusSuccess | HttpStatusCode.OK>

type StatusCode = StatusSuccess | StatusError

// Tipos para la respuesta exitosa
interface SuccessResponse<T> {
  status: StatusCode
  message: string
  data: T | null
  errors: null
  pagination?: Omit<IPagination<T>, 'data'>
}

// Tipos para la respuesta con error
interface ErrorResponse {
  status: StatusCode
  message: string
  data: null
  errors: { msg: string; path?: string }[]
}

interface SuccessResponseProps<T> {
  res: Response
  data: T | null
  message?: string
  statusCode?: StatusCode
  meta?: Omit<IPagination<T>, 'data'>
}

interface ErrorResponseProps {
  res: Response
  message: string
  errors: { msg: string; path?: string }[]
  statusCode: StatusCode
}
const successResponse = <T>({
  data,
  message = HttpStatusMessage.OK,
  res,
  statusCode = HttpStatusCode.Created,
  meta,
}: SuccessResponseProps<T>) => {
  const response: SuccessResponse<T> = {
    status: statusCode,
    message,
    data,
    errors: null,
    ...(meta && { meta }),
  }

  return res.status(statusCode).json(response)
}

const errorResponse = ({
  res,
  message = 'An error occurred',
  errors = [],
  statusCode = HttpStatusCode.BadRequest,
}: ErrorResponseProps) => {
  const response: ErrorResponse = {
    status: statusCode,
    message,
    data: null,
    errors,
  }

  return res.status(statusCode).json(response)
}

export { successResponse, errorResponse }

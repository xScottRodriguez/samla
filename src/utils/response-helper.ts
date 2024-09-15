import { Response } from 'express'
import { IPagination } from 'interfaces'

import { HttpStatusCode, HttpStatusMessage } from '../errors'

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
interface ISuccessResponse<T> {
  status: StatusCode
  message: string
  data: T | null
  errors: null
  pagination?: Omit<IPagination<T>, 'data'>
}

// Tipos para la respuesta con error
interface IErrorResponse {
  status: StatusCode
  message: string
  data: null
  errors: { msg: string; path?: string }[]
}

interface ISuccessResponseProps<T> {
  res: Response
  data: T | null
  message?: string
  statusCode?: StatusCode
  meta?: Omit<IPagination<T>, 'data'>
}

interface IErrorResponseProps {
  res: Response
  message: string
  errors: { msg: string; path?: string }[]
  statusCode: StatusCode
}
const SuccessResponse = <T>({
  data,
  message = HttpStatusMessage.OK,
  res,
  statusCode = HttpStatusCode.Created,
  meta,
}: ISuccessResponseProps<T>) => {
  const response: ISuccessResponse<T> = {
    status: statusCode,
    message,
    data,
    errors: null,
    ...(meta && { meta }),
  }

  return res.status(statusCode).json(response)
}

const ErrorResponse = ({
  res,
  message = 'An error occurred',
  errors = [],
  statusCode = HttpStatusCode.BadRequest,
}: IErrorResponseProps) => {
  const response: IErrorResponse = {
    status: statusCode,
    message,
    data: null,
    errors,
  }

  return res.status(statusCode).json(response)
}

export { SuccessResponse, ErrorResponse }

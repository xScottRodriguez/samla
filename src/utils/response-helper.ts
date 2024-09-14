import { HttpStatusCode, HttpStatusMessage } from '../errors'
import { Response } from 'express'

// Tipos para la paginación
interface Pagination {
  currentPage: number
  pageSize: number
  totalPages: number
  totalItems: number
}

type StatusSuccess =
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
  pagination?: Pagination // Se incluye solo si hay paginación
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
  message: string
  statusCode: StatusCode
  pagination?: Pagination
}

interface ErrorResponseProps {
  res: Response
  message: string
  errors: { msg: string; path?: string }[]
  statusCode: StatusCode
}
const successResponse = <T>({
  data,
  message,
  res,
  statusCode,
  pagination,
}: SuccessResponseProps<T>) => {
  const response: SuccessResponse<T> = {
    status: statusCode,
    message,
    data,
    errors: null,
    ...(pagination && { pagination }), // Solo se añade si existe paginación
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

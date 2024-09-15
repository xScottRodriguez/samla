import { Model } from 'mongoose'

import { ApiError } from '../errors'
import { IPagination, IPaginationOptions } from '../interfaces'
import { getTakeAndSkip } from '../utils'

/**
 * Servicio de paginación genérica para MongoDB usando Mongoose
 * @param {T} -> Es el tipo genérico a retornar
 */
const pageBuilder = async <T>(
  model: Model<T>,
  options: IPaginationOptions,
): Promise<IPagination<T>> => {
  try {
    const { limit = 10, page = 1, where = {} } = options
    const { skip, take } = getTakeAndSkip(limit, page)

    const [data, total] = await Promise.all([
      model
        .find(where as object)
        .skip(skip)
        .limit(take)
        .exec(),
      model.countDocuments(where as object),
    ])

    const next: number | null = total > take + skip ? page + 1 : null
    const prev: number | null = skip > 0 ? page - 1 : null
    const count: number = Math.ceil(total / take)

    return {
      data,
      total,
      page: {
        next,
        prev,
        count,
      },
    }
  } catch (error) {
    const err = error as Error
    throw ApiError.internalServer('Error en la paginación', [
      { msg: err.message, path: '' },
    ])
  }
}

export default pageBuilder

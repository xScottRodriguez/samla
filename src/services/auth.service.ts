import { RegistrationRequest } from '../models'
import { IRegistrationRequest } from '../interfaces'
import { ApiError } from '../errors'
import { logger } from '../utils'
class AuthService {
  async registry(payload: IRegistrationRequest) {
    try {
      return await RegistrationRequest.create<IRegistrationRequest>(payload)
    } catch (error) {
      const err = error as Error
      logger.error({
        label: 'AuthService',
        message: err.message,
        method: 'AuthService.registry',
      })
      throw ApiError.internalServer('Ocurrio un error Creando registro', [
        { msg: err.message, path: '' },
      ])
    }
  }
}

export default new AuthService()

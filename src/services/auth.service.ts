import { IRegistrationRequest } from '../interfaces'
class AuthService {
  registry(payload: IRegistrationRequest) {
    return payload
  }
}

export default new AuthService()

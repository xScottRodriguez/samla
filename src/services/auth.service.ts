import { RegistrationRequest } from '../models'
import { IRegistrationRequest } from '../interfaces'
class AuthService {
  async registry(payload: IRegistrationRequest) {
    const registrationRequestToSave =
      await RegistrationRequest.create<IRegistrationRequest>(payload)
    return registrationRequestToSave.save()
  }
}

export default new AuthService()

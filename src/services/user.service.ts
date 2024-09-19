import { Auth } from '../models'

export class UserService {
  async findById(id: string) {
    const user = await Auth.findById({
      _id: id,
    })
    return user
  }
}

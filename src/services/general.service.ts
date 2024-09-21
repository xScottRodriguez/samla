import { Departments, Documents, Municipalities } from '../models'

class GeneralService {
  async documents() {
    return await Documents.find()
  }
  async departments() {
    return await Departments.find()
  }
  async municipality() {
    return await Municipalities.find()
  }
}

export default new GeneralService()

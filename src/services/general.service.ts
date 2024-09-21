import mongoose from 'mongoose'

import { Departments, Documents, Municipalities } from '../models'

const ObjectId = mongoose.Types.ObjectId
class GeneralService {
  async documents() {
    return await Documents.find()
  }
  async departments() {
    return await Departments.find()
  }
  async municipality(departmentId: string) {
    return await Municipalities.find({
      departmentId: new ObjectId(departmentId),
    })
  }
}

export default new GeneralService()

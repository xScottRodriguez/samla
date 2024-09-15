import { IDataToSave } from '../interfaces'
import mongoose from 'mongoose'

const schema = new mongoose.Schema<IDataToSave>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  identificationType: {
    type: String,
    required: true,
    enum: ['Dui', 'Pasaporte', 'Licencia de conducir'],
  },
  identificationNumber: { type: String, required: true },
  region: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  monthlyIncome: { type: Number, required: true },
  identificationFront: { type: String, required: true },
  identificationBack: { type: String, required: true },
  selfie: { type: String, required: true },
})

export const RegistrationRequest = mongoose.model('registrationRequest', schema)

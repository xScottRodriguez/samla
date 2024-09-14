import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
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
  montlyIncome: { type: Number, required: true },
})

export const UserModel = mongoose.model('User', schema)

//write a simple auth model
import mongoose from 'mongoose'

const authSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
})

export const Auth = mongoose.model('auth', authSchema)

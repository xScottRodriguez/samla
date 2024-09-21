import mongoose, { Schema } from 'mongoose'

const departamentSchema = new Schema({
  name: { type: String, required: true },
})

export const Departments = mongoose.model('departments', departamentSchema)

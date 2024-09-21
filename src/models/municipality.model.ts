import mongoose, { Schema } from 'mongoose'

const municipalitySchema = new Schema({
  name: { type: String, required: true },
  departmentId: {
    type: Schema.Types.ObjectId,
    ref: 'Departments', // Debe coincidir con el nombre del modelo
    required: true, // Si es necesario que siempre haya un departamento asociado
  },
})

export const Municipalities = mongoose.model(
  'municipalities',
  municipalitySchema,
)

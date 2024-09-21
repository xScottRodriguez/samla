import mongoose, { Schema, Document } from 'mongoose'

interface IDocument extends Document {
  name: string
}

const documentSchema = new Schema<IDocument>({
  name: { type: String, required: true },
})

// Cambia 'documents' por el nombre en plural o singular que prefieras
export const Documents = mongoose.model<IDocument>('Document', documentSchema)

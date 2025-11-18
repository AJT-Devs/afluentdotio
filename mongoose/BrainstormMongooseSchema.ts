import mongoose, { Schema, Document } from 'mongoose'
export interface IBrainstormDoc extends Document {
  title: string
  ownerId: string
  description?: string
  createdAt: Date
  updatedAt: Date
}
const BrainstormSchema = new Schema<IBrainstormDoc>({
  title: { type: String, required: true },
  ownerId: { type: String, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

export const BrainstormModelDb =
  mongoose.models.Brainstorm || mongoose.model('Brainstorm', BrainstormSchema)

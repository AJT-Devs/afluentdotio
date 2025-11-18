import mongoose, { Schema, Document } from 'mongoose'

export interface IWordDoc extends Document {
  word: string
  category: string
  proximity: number
  brainstormId: mongoose.Types.ObjectId // Link para o Brainstorm
}

const WordSchema = new Schema<IWordDoc>({
  word: { type: String, required: true },
  category: { type: String, required: true },
  proximity: { type: Number, required: true, min: 1, max: 10 },
  // RELAÇÃO COM O BRAINSTORM
  brainstormId: {
    type: Schema.Types.ObjectId,
    ref: 'Brainstorm',
    required: true
  }
})

export const WordModelDb = mongoose.models.Word || mongoose.model<IWordDoc>('Word', WordSchema)

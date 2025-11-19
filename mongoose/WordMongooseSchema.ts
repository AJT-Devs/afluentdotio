import mongoose, { Schema, Document } from 'mongoose'
import { Word } from '../src/entities/Word'

export interface IWordDoc extends Omit<Word, 'id'>, Document {
  brainstormId: mongoose.Types.ObjectId
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

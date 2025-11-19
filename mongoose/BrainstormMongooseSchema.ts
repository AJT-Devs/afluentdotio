import mongoose, { Schema, Document } from 'mongoose'
import { Brainstorm } from '../src/entities/Brainstorm'

export interface IBrainstormDoc extends Omit<Brainstorm, 'id'>, Document {
  userId: mongoose.Types.ObjectId
}
const BrainstormSchema = new Schema<IBrainstormDoc>({
  name: { type: String, required: true },
  context: { type: String, required: true },
  date: { type: Date, default: Date.now },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  pool: {
        nodes: [{
            nodeId: { type: Schema.Types.ObjectId, required: true, auto: true },
            word: String,
            range: Number,
            position: { x: Number, y: Number },
            category: String,
            proximity: String
        }],
        edges: [{
            edgeId: { type: Schema.Types.ObjectId, required: true, auto: true },
            sourceNodeId: { type: Schema.Types.ObjectId, required: true },
            targetNodeId: { type: Schema.Types.ObjectId, required: true },
            label: String
        }],
        viewport: {
            x: { type: Number, default: 0 },
            y: { type: Number, default: 0 },
            zoom: { type: Number, default: 1 }
        }
    }
})

export const BrainstormModelDb =
  mongoose.models.Brainstorm || mongoose.model('Brainstorm', BrainstormSchema)

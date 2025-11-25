import mongoose, { Schema, Document } from 'mongoose'
import { Brainstorm, BrainstormNode, BrainstormEdge, Viewport, Position, BrainstormPool } from '../src/entities/Brainstorm'

export interface IBrainstormDoc extends Omit<Brainstorm, 'id'>, Document {
  userId: mongoose.Types.ObjectId
}

const PositionSchema = new Schema<Position>({
  x: { type: Number, required: true },
  y: { type: Number, required: true }
}, { _id: false })

const NodeSchema = new Schema<BrainstormNode>({
  word: { type: String, required: true },
  range: { type: Number, required: true },
  position: { type: PositionSchema, required: true },
  category: { type: String, required: true },
  proximity: { type: Number, required: true },
})

const EdgeSchema = new Schema<BrainstormEdge>({
  sourceNodeId: { type: Schema.Types.ObjectId, required: true },
  targetNodeId: { type: Schema.Types.ObjectId, required: true },
  label: { type: String, required: true },
})

const ViewportSchema = new Schema<Viewport>({
  x: { type: Number, default: 0 },
  y: { type: Number, default: 0 },
  zoom: { type: Number, default: 1 },
}, { _id: false })

const PoolSchema = new Schema<BrainstormPool>({
  nodes: { type: [NodeSchema], default: [] },
  edges: { type: [EdgeSchema], default: [] },
  viewport: { type: ViewportSchema, default: () => ({ x: 0, y: 0, zoom: 1 }) },
})

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
    type: PoolSchema, required: true
    }
})


export const BrainstormModelDb =
  mongoose.models.Brainstorm || mongoose.model('Brainstorm', BrainstormSchema)

import mongoose, { Schema, Document } from 'mongoose'
import { ErrorLog } from '../src/entities/ErrorLog'

export interface IErrorLogDoc extends Omit<ErrorLog, 'id'>, Document {
}
const ErrorLogSchema = new Schema<IErrorLogDoc>({
  message: { type: Schema.Types.Mixed, required: true },
  date: { type: Date, default: Date.now }
})

export const ErrorLogModelDB =
  mongoose.models.ErrorLog || mongoose.model<IErrorLogDoc>('ErrorLog', ErrorLogSchema)

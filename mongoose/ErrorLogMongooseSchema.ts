import mongoose, { Schema, Document } from 'mongoose'

export interface IErrorLogDoc extends Document {
  message: object
  date: Date
}
const ErrorLogSchema = new Schema<IErrorLogDoc>({
  message: { type: Schema.Types.Mixed, required: true },
  date: { type: Date, default: Date.now }
})

export const ErrorLogModelDB =
  mongoose.models.ErrorLog || mongoose.model<IErrorLogDoc>('ErrorLog', ErrorLogSchema)

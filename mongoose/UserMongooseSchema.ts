// src/mongoose/UserMongooseSchema.ts
import mongoose, { Schema, Document } from 'mongoose'

export interface IUserDoc extends Document {
  name: string
  photo?: string
  aikey?: string
  preferenceaimodel?: string
}

const UserSchema = new Schema<IUserDoc>({
  name: { type: String, required: true, minlength: 2 },
  photo: { type: String },
  aikey: { type: String },
  preferenceaimodel: { type: String }
})

export const UserModelDb = mongoose.models.User || mongoose.model<IUserDoc>('User', UserSchema)

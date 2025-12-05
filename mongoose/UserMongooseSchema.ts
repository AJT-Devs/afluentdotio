// src/mongoose/UserMongooseSchema.ts
import mongoose, { Schema, Document, Types } from 'mongoose'
import { User } from '../src/entities/User'

export interface IUserDoc extends Omit<User, 'id'>, Document {
  _id: Types.ObjectId;
}

const UserSchema = new Schema<IUserDoc>({
  name: { type: String, required: true, minlength: 2 },
  photo: { type: String },
  aikey: { type: String },
  preferenceaimodel: { type: String }
})

export const UserModelDb = mongoose.models.User || mongoose.model<IUserDoc>('User', UserSchema)

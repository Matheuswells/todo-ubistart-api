import { Document } from 'mongoose'

export class User extends Document {
  email: string
  password: string
  //timestamps: date;
}

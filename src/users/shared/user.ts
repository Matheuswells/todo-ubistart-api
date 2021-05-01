import { Document } from 'mongoose'

export class Todo extends Document {
  name: string
  email: string
  password: string
  //timestamps: date;
}

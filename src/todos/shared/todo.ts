import { Document } from 'mongoose'

export class Todo extends Document {
  owner: string
  description: string
  completed: boolean
  dueDate: Date
}

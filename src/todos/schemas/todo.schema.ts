import * as mongoose from 'mongoose'
export const TodoSchema = new mongoose.Schema(
  {
    owner: String,
    description: String,
    completed: Boolean,
    dueDate: Date,
  },
  { timestamps: true },
)

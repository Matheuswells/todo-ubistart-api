import { Injectable } from '@nestjs/common'
import { Todo } from './todo'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

@Injectable()
export class TodosService {
  todos = []

  constructor(@InjectModel('Todo') private readonly todoModel: Model<Todo>) {}

  async getAll() {
    return await this.todoModel.find().exec()
  }

  async getById(id: string) {
    return this.todoModel.findById(id).exec()
  }

  async createTodo(todo: Todo) {
    const createdTodo = new this.todoModel(todo)
    return await createdTodo.save()
  }

  async updateTodo(id: string, todo: Todo) {
    await this.todoModel.updateOne({ _id: id }, todo).exec()
    return this.getById(id)
  }

  async deleteTodo(id: string) {
    return await this.todoModel.deleteOne({ _id: id }).exec()
  }
}

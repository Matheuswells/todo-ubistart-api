import { Injectable } from '@nestjs/common'
import { Todo } from './todo'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from 'src/users/shared/user'

@Injectable()
export class TodosService {
  constructor(
    @InjectModel('Todo') private readonly todoModel: Model<Todo>,
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  async getAll(userId: string) {
    const user = await this.userModel.findById(userId).skip(0).limit(10).exec() //Pagination
    if (!user) return await this.todoModel.find({ owner: userId }).exec()
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
    const dbTodo = await this.todoModel.findById(id)
    if (!dbTodo) return { message: 'item not exists' }
    await this.todoModel.updateOne({ _id: id }, todo).exec()
    return this.getById(id)
  }

  async deleteTodo(id: string, userId: string) {
    const todo = await this.todoModel.findById(id)
    if (!todo) return { message: 'item not exists' }
    if (userId == todo.owner) {
      return await this.todoModel.deleteOne({ _id: id }).exec()
    }
    return { message: 'You are not allowed to delete this item' }
  }
}

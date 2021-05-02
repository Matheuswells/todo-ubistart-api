import { Injectable } from '@nestjs/common'
import { User } from './user'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async getAll() {
    return await this.userModel.find().exec()
  }

  async getById(id: string) {
    return this.userModel.findById(id).exec()
  }

  async createUser(user: User) {
    const createdUser = new this.userModel(user)
    return await createdUser.save()
  }

  async updateUser(id: string, user: User) {
    await this.userModel.updateOne({ _id: id }, user).exec()
    return this.getById(id)
  }

  async deleteUser(id: string) {
    return await this.userModel.deleteOne({ _id: id }).exec()
  }
}

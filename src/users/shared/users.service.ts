import { Injectable } from '@nestjs/common'
import { User } from './user'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
dotenv.config()
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
    user.password = await bcrypt.hash(user.password, 8)
    const createdUser = new this.userModel(user)
    return await createdUser.save()
  }
  async checkPassword(id: string, passwordLogin: string) {
    const user = await this.userModel.findById(id).exec()
    return bcrypt.compare(passwordLogin, user.password)
  }

  async generateToken(id: string) {
    const hash = jwt.sign({ id: id }, 'b12268cd7cb028dd180bb451bdc4181e')
    const token = `Bearer ${hash}`
    return token
  }

  async updateUser(id: string, user: User) {
    await this.userModel.updateOne({ _id: id }, user).exec()
    return this.getById(id)
  }

  async deleteUser(id: string) {
    return await this.userModel.deleteOne({ _id: id }).exec()
  }
  async findUserByEmail(email: string) {
    return await this.userModel.findOne({ email }).exec()
  }

  async login(loginEmail: string, loginPassword: string) {
    const user = await this.userModel.findOne({ email: loginEmail }).exec()
    if (!user) return false
    const { password } = user
    return await bcrypt.compare(loginPassword, password)
  }
}

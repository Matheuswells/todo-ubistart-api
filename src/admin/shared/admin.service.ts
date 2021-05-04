import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from 'src/users/shared/user'

@Injectable()
export class AdminService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async getAdmin(key: string, id: string) {
    const user = await this.userModel.findById(id).exec()
    if (!user) return { message: 'user not found' }
    if (!key) return { message: 'key not provided' }
    user.administrator = true
    if (key == 'bcb1919def1affd2f4f769b4f0f39c0e')
      return this.userModel.updateOne({ _id: id }, user)
  }
}

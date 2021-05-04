import { Body, Controller, Param, Get, Post, Put, Delete } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from './shared/user'
import { UsersService } from './shared/users.service'
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  @Get()
  async getAll() {
    return this.usersService.getAll()
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<User> {
    return this.usersService.getById(id)
  }

  @Post('register/')
  async createUser(@Body() user: User) {
    const { email, password } = user

    //Verificar dados do usuarios
    if (!email || !password) return { message: 'Incomplete user data' }

    //Verifica ase o usuario não existe
    const preventUser = await this.usersService.findUserByEmail(email)
    if (preventUser != null) return { message: 'User alredy exists' }

    //Verifica tamanho da senha
    if (password.length < 3) return { message: 'Password very short' }

    await this.usersService.createUser(user)
    const createdUser = await this.userModel.findOne({ email }).exec()
    const token = await this.usersService.generateToken(createdUser.id)

    return { user: createdUser, token: token }
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() todo: User): Promise<User> {
    todo.id = id
    return this.usersService.updateUser(id, todo)
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id)
  }

  @Post('login/')
  async login(@Body() user: User) {
    const { email, password } = user
    const correctPassowrd = await this.usersService.login(email, password)
    if (correctPassowrd) {
      const createdUser = await this.userModel.findOne({ email }).exec()
      const token = await this.usersService.generateToken(createdUser.id)
      return { user: createdUser, token: token }
    } else {
      return { message: 'Invalid credentials' }
    }
  }
}

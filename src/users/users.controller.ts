import { Body, Controller, Param, Get, Post, Put, Delete } from '@nestjs/common'
import { User } from './shared/user'
import { UsersService } from './shared/users.service'
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAll(): Promise<Array<User>> {
    return this.usersService.getAll()
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<User> {
    return this.usersService.getById(id)
  }
  @Post()
  async createTodo(@Body() todo: User): Promise<User> {
    return this.usersService.createUser(todo)
  }

  @Put(':id')
  async updateTodo(@Param('id') id: string, @Body() todo: User): Promise<User> {
    todo.id = id
    return this.usersService.updateUser(id, todo)
  }

  @Delete(':id')
  async deleteTodo(@Param('id') id: string) {
    return this.usersService.deleteUser(id)
  }
}

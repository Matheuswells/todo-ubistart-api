import { Body, Controller, Param, Get, Post, Put, Delete } from '@nestjs/common'
import { Todo } from './shared/todo'
import { TodosService } from './shared/todos.service'

@Controller('todos')
export class TodosController {
  constructor(private readonly todoService: TodosService) {}

  @Get()
  async getAll(@Body() userId): Promise<Array<Todo>> {
    return this.todoService.getAll(userId.userId)
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Todo> {
    return this.todoService.getById(id)
  }

  @Post('create/')
  async createTodo(@Body() todo: Todo, @Body() userId) {
    todo.owner = userId.userId

    const { description, completed } = todo

    if (!description) return { message: 'description must be provided' }

    if (description.length < 3)
      return {
        error: 'Description must be longer than two character',
      }
    if (completed == null || completed == undefined) {
      todo.completed = false
    }
    return this.todoService.createTodo(todo)
  }

  @Put(':id')
  async updateTodo(
    @Param('id') id: string,
    @Body() todo: Todo,
    @Body() userId,
  ) {
    todo.id = id
    const dbTodo = await this.todoService.getById(id)
    if (!dbTodo) return { message: 'Item not found' }
    if (userId.userId != dbTodo.owner)
      return { message: 'You are not allowed to edit this item' }

    const { description } = todo
    if (description.length < 1)
      return {
        error: 'Description must be longer than one character',
      }
    if (dbTodo.completed == true) {
      todo.dueDate = new Date()
      return await this.todoService.updateTodo(id, todo)
    }
    return await this.todoService.updateTodo(id, todo)
  }

  @Delete(':id')
  async deleteTodo(@Param('id') id: string, @Body() userId) {
    return this.todoService.deleteTodo(id, userId.userId)
  }
}

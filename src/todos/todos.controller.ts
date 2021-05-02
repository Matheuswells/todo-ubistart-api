import { Body, Controller, Param, Get, Post, Put, Delete } from '@nestjs/common'
import { Todo } from './shared/todo'
import { TodosService } from './shared/todos.service'

@Controller('todos')
export class TodosController {
  constructor(private readonly todoService: TodosService) {}

  @Get()
  async getAll(): Promise<Array<Todo>> {
    return this.todoService.getAll()
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Todo> {
    return this.todoService.getById(id)
  }

  @Post()
  async createTodo(@Body() todo: Todo) {
    const { description } = todo
    const { completed } = todo
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
  async updateTodo(@Param('id') id: string, @Body() todo: Todo) {
    todo.id = id
    const { description } = todo
    if (description.length < 1)
      return {
        error: 'Description must be longer than one character',
      }
    return this.todoService.updateTodo(id, todo)
  }

  @Delete(':id')
  async deleteTodo(@Param('id') id: string) {
    return this.todoService.deleteTodo(id)
  }
}

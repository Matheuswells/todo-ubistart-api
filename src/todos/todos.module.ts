import { Module } from '@nestjs/common'
import { TodosController } from './todos.controller'
import { TodosService } from './shared/todos.service'
import { TodoSchema } from './schemas/todo.schema'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Todo', schema: TodoSchema }])],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}

import { Module } from '@nestjs/common'
import { TodosController } from './todos.controller'
import { TodosService } from './shared/todos.service'
import { TodoSchema } from './schemas/todo.schema'
import { MongooseModule } from '@nestjs/mongoose'
import { UserSchema } from 'src/users/schemas/user.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Todo', schema: TodoSchema },
      { name: 'User', schema: UserSchema },
    ]),
  ],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}

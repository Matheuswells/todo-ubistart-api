import { Module } from '@nestjs/common'
import { TodosModule } from 'src/todos/todos.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://localhost:27017/todoubistart?retryWrites=true&w=majority',
    ),
    TodosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

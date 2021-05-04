import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { TodosModule } from 'src/todos/todos.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthMiddleware } from 'src/middlewares/auth.middleware'
import { UsersModule } from 'src/users/users.module'
import { AdminModule } from 'src/admin/admin.module'

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://localhost:27017/todoubistart?retryWrites=true&w=majority',
    ),
    TodosModule,
    UsersModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('todos', 'admin')
  }
}

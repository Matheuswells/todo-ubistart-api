import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { TodosModule } from 'src/todos/todos.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthMiddleware } from 'src/middlewares/auth.middleware'
import { UsersModule } from 'src/users/users.module'
import { AdminModule } from 'src/admin/admin.module'
import * as dotenv from 'dotenv'
dotenv.config()
@Module({
  imports: [
    //ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
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

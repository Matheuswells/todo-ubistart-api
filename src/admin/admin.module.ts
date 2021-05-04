import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UserSchema } from 'src/users/schemas/user.schema'
import { AdminController } from './admin.controller'
import { AdminService } from './shared/admin.service'

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}

import { Body, Controller, Post } from '@nestjs/common'
import { AdminService } from './shared/admin.service'

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('verify/')
  async getAdmin(@Body() key, @Body() userId) {
    return await this.adminService.getAdmin(key.key, userId.userId)
  }
}

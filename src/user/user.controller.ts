import { Controller, Post, Body, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { SaveUserDataDto } from './dto/save-user-data.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Endpoint for saving user additional data
  @Post('saveUserData')
  async saveUserData(@Body() body: SaveUserDataDto) {
    return this.userService.saveUserData(body);
  }

  // Endpoint to get all users
  @Get()
  async getAllUsers() {
    return this.userService.getAllUsers();
  }
}

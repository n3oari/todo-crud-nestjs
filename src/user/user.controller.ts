import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../entities/user.entity';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }


  @Post()
  async createUser(@Body() userData: { id: number, message: string }): Promise<User> {
    return this.userService.createUser(userData);


  }
}


import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginDto } from './dto/LoginDto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginUser: LoginDto) {
    const user = await this.authService.login(loginUser);
    console.log(`user login successfully ${user}`);
    return user;
  }

  @Post('register')
  async register(@Body() registerUser: CreateUserDto) {
    console.log(`user register successfully ${registerUser}`);
    return this.authService.register(registerUser);
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  profile(@Request() request) {
    return request.user;
  }
}

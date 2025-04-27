import {
  BadRequestException,
  Injectable,
  UnauthorizedException,    
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/LoginDto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) { }

  async login({ email, password }: LoginDto): Promise<{ email: string, token: string }> {
    const userVerify = await this.userService.findByEmail(email);

    if (!userVerify) {
      throw new BadRequestException('user doenst exists');
    }

    const isPasswordValid = await bcryptjs.compare(
      password,
      userVerify.password, 
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('wrong password');
    }


    const payload = { email: userVerify.email };

    const token = await this.jwtService.signAsync(payload);

    return {

      token,
      email: userVerify.email


    };
  }

  async register(registerUser: CreateUserDto) {
    const hashedPassword = await bcryptjs.hash(registerUser.password, 10);
    const user = {
      ...registerUser,
      password: hashedPassword,
    };
    return await this.userService.create(user);
  }

}

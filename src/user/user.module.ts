import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from './entities/user.entity';
import { Task } from '../task/entities/task.entity';

@Module({
  imports: [MikroOrmModule.forFeature([User, Task])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}

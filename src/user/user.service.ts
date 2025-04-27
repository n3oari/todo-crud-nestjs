import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { EntityManager } from '@mikro-orm/core';
@Injectable()
export class UserService {
  constructor(private readonly em: EntityManager) {}

  async create(userData: CreateUserDto): Promise<User> {
    await this.verifyEmail(userData.email);

    const user = this.em.create(User, userData);
    await this.em.persistAndFlush(user);
    console.log(`user ${user.id} was created successfully`);
    return user;
  }

  async findAll() {
    const user = await this.em.find(User, {});
    if (!user) {
      throw new NotFoundException('No users found');
    }
    console.log(user);
    console.log(`user ${user} was found successfully`);
    return user;
  }

  async findOne(id: number) {
    const user = await this.em.findOne(User, { id });
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.em.findOne(User, { id });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    this.em.assign(user, updateUserDto);
    await this.em.persistAndFlush(user);
  }

  async remove(id: number) {
    const user = await this.em.findOne(User, { id });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    this.em.remove(user);
    await this.em.flush();

    console.log(`user ${id} was deleted successfully`);
  }

  async verifyEmail(email: string): Promise<void> {
    const verifyEmail = await this.em.findOne(User, { email });

    if (verifyEmail) {
      throw new ConflictException('Email already exists');
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.em.findOne(User, { email });
  }
}

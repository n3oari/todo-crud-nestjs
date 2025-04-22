import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { EntityManager } from '@mikro-orm/core';
@Injectable()


export class UserService {
  constructor(private readonly em: EntityManager) {}


  async createUser(userData: { id: number, message: string }): Promise<User> {
    const user = this.em.create(User,userData);
    await this.em.persistAndFlush(user);
    console.log(`user ${userData.id} was created successfully`); 
    return user;
  }
}


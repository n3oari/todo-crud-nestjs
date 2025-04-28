import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { User } from 'src/user/entities/user.entity';
import { EntityManager } from '@mikro-orm/core';


@Injectable()
export class TaskService {
  constructor(private readonly em: EntityManager) {}


  async create(createTaskDto: CreateTaskDto,userId:number) : Promise<Task> {
    const user = this.em.getReference(User, userId);

     if (!user) {
    throw new Error(`User with id ${userId} not found`);
  }

    const task = this.em.create(Task, {
      ...createTaskDto,
      status: 'pending',
      user
    });
    await this.em.persistAndFlush(task);
    console.log(`task ${task.id} was created successfully `);
    return task;

  }

  findAll() {
    return `This action returns all task`;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}

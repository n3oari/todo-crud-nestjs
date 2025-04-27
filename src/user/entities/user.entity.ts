import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Task } from 'src/task/entities/task.entity';

@Entity()
export class User {
  @PrimaryKey()
  id!: number;

  @Property({ nullable: true, unique: true })
  username!: string;

  @Property({ nullable: true })
  firstName!: string;

  @Property({ nullable: true })
  lastName!: string;

  @Property({ nullable: false, unique: true })
  email!: string;

  @Property({ nullable: false })
  password!: string;

  @Property({ defaultRaw: 'CURRENT_TIMESTAMP' })
  createdAt?: Date = new Date();

  @Property({ defaultRaw: 'CURRENT_TIMESTAMP', onUpdate: () => new Date() })
  updatedAt?: Date = new Date();

  @ManyToOne(() => Task, { nullable: true })
  task?: Task;
}

import { Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { User } from 'src/user/entities/user.entity';
import { Collection } from '@mikro-orm/core';

@Entity()
export class Task {
  @PrimaryKey()
  id!: number;

  @Property({ nullable: true })
  title!: string;

  @Property({ nullable: true })
  description!: string;

  @Property({ nullable: true })
  status!: string;

  @Property({ defaultRaw: 'CURRENT_TIMESTAMP' })
  createdAt?: Date = new Date();

  @Property({ defaultRaw: 'CURRENT_TIMESTAMP', onUpdate: () => new Date() })
  updatedAt?: Date = new Date();

  @OneToMany(() => User, (user) => user.task)
  users = new Collection<User>(this);
}

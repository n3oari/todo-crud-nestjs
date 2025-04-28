import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class Task {
  @PrimaryKey()
  id!: number;

  @Property({ nullable: true })
  title!: string;

  @Property({ nullable: true })
  description!: string;

  @Property({ nullable: true, default: 'pending' })
  status?: string;

  @Property({ defaultRaw: 'CURRENT_TIMESTAMP' })
  createdAt?: Date = new Date();

  @Property({ defaultRaw: 'CURRENT_TIMESTAMP', onUpdate: () => new Date() })
  updatedAt?: Date = new Date();

  @ManyToOne(() => User)
  user!: User;
}


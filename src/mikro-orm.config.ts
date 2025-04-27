import { defineConfig } from '@mikro-orm/sqlite';
import { User } from './user/entities/user.entity';
import { Task } from './task/entities/task.entity';
export default defineConfig({
  dbName: 'db.sqlite',
  host: 'localhost',
  password: 'root',
  entities: [User, Task],
  migrations: {
    path: './migrations',
    pathTs: './src/migrations',
  },
  debug: true,
});

import { defineConfig } from '@mikro-orm/sqlite';
import { User }  from './entities/user.entity';
export default defineConfig({
  dbName: 'db.sqlite',
  host: 'localhost',
  password: 'root',
  entities: [User], // rutas en TS (para desarrollo)
  debug: true,
    migrations: {
    path: './migrations', // Carpeta donde se guardarán las migraciones
    pathTs: './src/migrations',
    }});

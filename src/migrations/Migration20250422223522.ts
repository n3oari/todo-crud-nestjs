import { Migration } from '@mikro-orm/migrations';

export class Migration20250422223522 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`user\` (\`id\` integer not null primary key autoincrement, \`message\` text not null default 'Hello, MikroORM!');`);
  }

}

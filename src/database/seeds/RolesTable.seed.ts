import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Roles } from '../../roles/entities/roles.entity';

export class RolesTableSeed implements Seeder {
  constructor(private connection: Connection) {}

  public async run(): Promise<void> {
    if (!this.connection) return;
    await this.clearTable('roles');

    const roles = [
      { id: 1, name: 'super' },
      { id: 2, name: 'admin' },
      { id: 3, name: 'manager' },
    ];

    await this.connection.createQueryBuilder().insert().into(Roles).values(roles).execute();
  }

  async clearTable(tableName: string) {
    if (this.connection) {
      await this.connection.query('SET FOREIGN_KEY_CHECKS=0;');
      await this.connection.query(`TRUNCATE TABLE ${tableName}`);
      await this.connection.query('SET FOREIGN_KEY_CHECKS=1;');
    }
  }
}

import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Categories } from '../../categories/entities/categories.entity';
import {Roles} from "../../roles/entities/roles.entity";

export class CategoriesTableSeed implements Seeder {
  constructor(private connection: Connection) {}

  public async run(): Promise<void> {
    if (!this.connection) return;
    await this.clearTable('categories');

    const categories = [
      {
        name: 'Art',
        desciption: null,
        business_id: 1,
      },
      {
        name: 'Nature',
        desciption: null,
        business_id: 1,
      },
      {
        name: 'Faces illustrations',
        desciption: null,
        business_id: 1,
      },
      {
        name: 'Animals',
        desciption: null,
        business_id: 1,
      },
    ];
    await this.connection.createQueryBuilder().insert().into(Categories).values(categories).execute();
  }

  async clearTable(tableName: string) {
    if (this.connection) {
      await this.connection.query('SET FOREIGN_KEY_CHECKS=0;');
      await this.connection.query(`TRUNCATE TABLE ${tableName}`);
      await this.connection.query('SET FOREIGN_KEY_CHECKS=1;');
    }
  }
}

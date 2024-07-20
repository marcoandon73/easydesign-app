import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { BackgroundsEntity } from '../../backgrounds/entities/backgrounds.entity';

export class BackgroundsTableSeed implements Seeder {
  constructor(private connection: Connection) {}

  public async run(): Promise<void> {
    if (!this.connection) return;
    await this.clearTable('backgrounds');

    const bgs = [
      {
        id: 1,
        photo: 'wall-1.png',
        business_id: 1,
      },
      {
        id: 2,
        photo: 'wall-2.png',
        business_id: 1,
      },
      {
        id: 3,
        photo: 'wall-3.png',
        business_id: 1,
      },
      {
        id: 4,
        photo: 'wall-4.png',
        business_id: 1,
      },
      {
        id: 5,
        photo: 'wall-5.png',
        business_id: 1,
      },
      {
        id: 6,
        photo: 'wall-6.png',
        business_id: 1,
      },
    ];

    await this.connection.createQueryBuilder().insert().into(BackgroundsEntity).values(bgs).execute();
  }

  async clearTable(tableName: string) {
    if (this.connection) {
      await this.connection.query('SET FOREIGN_KEY_CHECKS=0;');
      await this.connection.query(`TRUNCATE TABLE ${tableName}`);
      await this.connection.query('SET FOREIGN_KEY_CHECKS=1;');
    }
  }
}

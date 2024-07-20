import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Stats } from '../../stats/entities/stats.entity';

export class StatsTableSeed implements Seeder {
  constructor(private connection: Connection) {}

  public async run(): Promise<void> {
    if (!this.connection) return;
    await this.clearTable('stats');

    const stats = [
      {
        nbr_whatsapp_submits: 5,
        nbr_email_submits: 1,
        nbr_facebook_submits: 3,
        nbr_ask_phone_submits: 2,
        product_id: 1,
        business_id: 1,
      },
      {
        nbr_whatsapp_submits: 2,
        nbr_email_submits: 1,
        nbr_facebook_submits: 2,
        nbr_ask_phone_submits: 3,
        product_id: 2,
        business_id: 1,
      },
    ];

    await this.connection.createQueryBuilder().insert().into(Stats).values(stats).execute();
  }

  async clearTable(tableName: string) {
    if (this.connection) {
      await this.connection.query('SET FOREIGN_KEY_CHECKS=0;');
      await this.connection.query(`TRUNCATE TABLE ${tableName}`);
      await this.connection.query('SET FOREIGN_KEY_CHECKS=1;');
    }
  }
}

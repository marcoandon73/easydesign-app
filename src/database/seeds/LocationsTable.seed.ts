import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import data from './locations.json';
import {UsersEntity} from "../../users/entities/users.entity";
import {Locations} from "../../locations/entities/locations.entity";
import {Permissions} from "../../roles/entities/permissions.entity";

export class LocationsTableSeed implements Seeder {
  constructor(private connection: Connection) {}
  public async run(): Promise<void> {
    if (!this.connection) return;
    this.clearTable('locations');
    await this.connection.createQueryBuilder().insert().into(Locations).values(data).execute();

  }



  async clearTable(tableName: string) {
    if (this.connection) {
      await this.connection.query('SET FOREIGN_KEY_CHECKS=0;');
      await this.connection.query(`TRUNCATE TABLE ${tableName}`);
      await this.connection.query('SET FOREIGN_KEY_CHECKS=1;');
    }
  }
}

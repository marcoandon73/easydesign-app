import { Seeder } from 'typeorm-seeding';
import {Connection, getConnection, In} from 'typeorm';
import { Roles } from '../../roles/entities/roles.entity';
import { Permissions } from '../../roles/entities/permissions.entity';

export class PermissionsTableSeed implements Seeder {
  constructor(private connection: Connection) {

  }

  public async run(): Promise<void> {
    if(! this.connection) return ;
    await this.clearTable('permissions');

    // super permissions
    const superPermissions = [
      { id: 1, name: 'roles-list' },
      { id: 2, name: 'roles-create' },
      { id: 3, name: 'roles-delete' },

      { id: 4, name: 'users-list' },
      { id: 5, name: 'users-create' },
      { id: 6, name: 'users-delete' },
      { id: 7, name: 'users-block' },
      { id: 8, name: 'users-unblock' },
      { id: 9, name: 'users-update' },
      { id: 10, name: 'users-getOne' },
    ];
    await this.connection.createQueryBuilder().insert().into(Permissions).values(superPermissions).execute();


    await this.clearTable('role_has_permissions');
    const superRole = await this.connection
      .getRepository(Roles)
      .findOne({ where: { name: 'super' } });

    // superPermissions.map((item) => item.id)
    const superPermissionsFromDB = await this.connection
      .getRepository(Permissions)
      .find({ where: { id: In([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])} });

    await this.connection
      .createQueryBuilder()
      .insert()
      .into('role_has_permissions')
      .values(
        superPermissionsFromDB.map((perm) => {
          return { role_id: superRole.id, permission_id: perm.id };
        }),
      )
      .execute();

  }

  async clearTable(tableName: string) {
    if(this.connection){
      await this.connection.query('SET FOREIGN_KEY_CHECKS=0;');
      await this.connection.query(`TRUNCATE TABLE ${tableName}`);
      await this.connection.query('SET FOREIGN_KEY_CHECKS=1;');
    }
  }
}

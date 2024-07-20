import { Factory, Seeder } from 'typeorm-seeding';
import {Connection, getConnection} from 'typeorm';
import { UsersEntity } from '../../users/entities/users.entity';
import * as bcrypt from 'bcrypt';
import { Roles } from '../../roles/entities/roles.entity';
import { faker } from '@faker-js/faker';


export class UsersTableSeed implements Seeder {
  constructor(private connection: Connection) {}
  public async run(): Promise<void> {
    if (!this.connection) return;

    const saltSize = 10;
    const userRepository = this.connection.getRepository(UsersEntity);
    const roleRepository = this.connection.getRepository(Roles);

    const has_users = await userRepository.find();
    if (has_users.length > 0) return;

    await this.clearTable('business_user');
    await this.clearTable('users');

    const adminRole = await roleRepository.findOne({ name: 'admin' });
    const superRole = await roleRepository.findOne({ name: 'super' });

    const salt = await bcrypt.genSalt(saltSize);
    const superNewUser = userRepository.create({
      id: 1,
      lastname: 'superChbani',
      firstname: 'superAnass',
      name: 'Anass CHBANI(super)',
      address: 'Sbata',
      phone: '+212 06 30 93 19 97',
      email: 'super@demo.com',
      password: bcrypt.hashSync('demosuper', salt),
      email_verified_at: new Date(),
      salt,
      role: superRole,
    });
    await userRepository.save(superNewUser);


    const adminNewUser = userRepository.create({
      id: 2,
      lastname: 'CHBANI',
      firstname: 'Anass',
      name: 'Anass CHBANI',
      address: 'Sbata',
      phone: '+212 06 30 93 19 97',
      email: 'admin1@demo.com',
      salt,
      password: bcrypt.hashSync('demo1', salt),
      email_verified_at: new Date(),
      role: adminRole,
    });
    await userRepository.save(adminNewUser);


  }

  async clearTable(tableName: string) {
    if (this.connection) {
      await this.connection.query('SET FOREIGN_KEY_CHECKS=0;');
      await this.connection.query(`TRUNCATE TABLE ${tableName}`);
      await this.connection.query('SET FOREIGN_KEY_CHECKS=1;');
    }
  }

}

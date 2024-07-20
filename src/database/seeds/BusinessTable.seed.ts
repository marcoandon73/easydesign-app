import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Businesses } from '../../businesses/entities/businesses.entity';
import { Locations } from '../../locations/entities/locations.entity';
import { UsersEntity } from '../../users/entities/users.entity';
import { SlugifyPipe } from '../../helpers/pipes/slugify.pipe';

export class BusinessTableSeed implements Seeder {
  constructor(private connection: Connection) {}

  public async run(): Promise<void> {
    if (!this.connection) return;
    await this.clearTable('businesses');

    const businessReposittory = this.connection.getRepository(Businesses);
    const locatitonReposittory = this.connection.getRepository(Locations);
    const usersRepository = this.connection.getRepository(UsersEntity);
    const users = await usersRepository.find();
    const location = await locatitonReposittory.findOne({ id: 152 });
    const slugifyPipe = new SlugifyPipe();
    const slug = slugifyPipe.transform('Decozin') + '_' + new Date().getTime();
    const newBusiness = await businessReposittory.create({
      id: 1,
      name: 'Decozin',
      logo: 'logo.png',
      description: 'Paintings',
      phone: '+212 630931997',
      messenger_link: 'm.me/104638675266559',
      email: 'chbanianass20@gmail.com',
      website: 'https://www.decozin.upwebapp.com',
      address: 'Casablanca, Morocco',
      slug,
      location,
      users,
    });
    await businessReposittory.save(newBusiness);
  }

  async clearTable(tableName: string) {
    if (this.connection) {
      await this.connection.query('SET FOREIGN_KEY_CHECKS=0;');
      await this.connection.query(`TRUNCATE TABLE ${'business_user'}`);
      await this.connection.query(`TRUNCATE TABLE ${'businesses'}`);
      await this.connection.query('SET FOREIGN_KEY_CHECKS=1;');
    }
  }
}

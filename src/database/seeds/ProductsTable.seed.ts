import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import {Categories} from "../../categories/entities/categories.entity";
import {Products} from "../../products/entities/products.entity";

export class ProductsTableSeed implements Seeder {
  constructor(private connection: Connection) {}

  public async run(): Promise<void> {
    if (!this.connection) return;
    await this.clearTable('products');
    const categoryRepository = await this.connection.getRepository(Categories);
    const categories = (await categoryRepository.find()) || [];

    const products = [
      {
        id: 1,
        photo: 'painting-1.jpg',
        name: 'Beaty chaouen',
        description: 'Paintings',
        price: 233,
        category: categories[Math.floor(Math.random() * categories.length)],
      },
      {
        id: 2,
        photo: 'painting-2.jpg',
        name: 'Lovely door',
        description: 'Paintings',
        price: 233,
        category: categories[Math.floor(Math.random() * categories.length)],
      },
      {
        id: 3,
        photo: 'painting-3.jpg',
        name: 'Sunset',
        description: 'Paintings',
        price: 233,
        category: categories[Math.floor(Math.random() * categories.length)],
      },
      {
        id: 4,
        photo: 'painting-4.jpg',
        name: 'Red sea',
        description: 'Paintings',
        price: 233,
        category: categories[Math.floor(Math.random() * categories.length)],
      },
    ];
    await this.connection.createQueryBuilder().insert().into(Products).values(products).execute();
  }

  async clearTable(tableName: string) {
    if (this.connection) {
      await this.connection.query('SET FOREIGN_KEY_CHECKS=0;');
      await this.connection.query(`TRUNCATE TABLE ${tableName}`);
      await this.connection.query('SET FOREIGN_KEY_CHECKS=1;');
    }
  }
}

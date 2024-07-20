import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import {Roles} from "../../roles/entities/roles.entity";
import {Products} from "../../products/entities/products.entity";
import {Dimensions} from "../../products/entities/dimensions.entity";

export class DimensionsTableSeed implements Seeder {
  constructor(private connection: Connection) {}

  public async run(): Promise<void> {
    if(! this.connection) return ;
    await this.clearTable('dimensions');

    const productRepository = this.connection.getRepository(Products);
    const products = await productRepository.find();

    const dimensions = [
      {
        id: 1,
        height: 1.3,
        width: 1,
        price: 46,
        product: products[0],
      },
      {
        id: 2,
        height: 1.3,
        width: 1,
        price: 46,
        product: products[1],
      },
      {
        id: 3,
        height: 1.3,
        width: 1,
        price: 46,
        product: products[2],
      },
      {
        id: 4,
        height: 1.3,
        width: 1,
        price: 46,
        product: products[3],
      },
    ];

    await this.connection.createQueryBuilder().insert().into(Dimensions).values(dimensions).execute();
  }

  async clearTable(tableName: string) {
    if(this.connection){
      await this.connection.query('SET FOREIGN_KEY_CHECKS=0;');
      await this.connection.query(`TRUNCATE TABLE ${tableName}`);
      await this.connection.query('SET FOREIGN_KEY_CHECKS=1;');
    }
  }
}

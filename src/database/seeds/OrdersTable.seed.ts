import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import {Roles} from "../../roles/entities/roles.entity";
import {Products} from "../../products/entities/products.entity";
import {Orders} from "../../orders/entities/orders.entity";
import {OrderStatus} from "../../orders/enums/enums";

export class OrdersTableSeed implements Seeder {
  constructor(private connection: Connection) {}

  public async run(): Promise<void> {
    if (!this.connection) return ;
    await this.clearTable();
    await this.clearTable();
    const productRepository = this.connection.getRepository(Products);
    const products = await productRepository.find();

    const orders = [
      {
        id: 1,
        photo: 'order-painting-1.png',
        customer_phone: '+212630931997',
        customer_city: 'Casablanca',
        customer_country: 'Morocco',
        customer_address: '56, street 09, Casablanca, Morocco',
        status:  OrderStatus.COMPLETED as const,
        business_id: 1,
        order_type: 'ask_phone',
        customer_message: 'Hello i want this :)',
        customer_email: 'a.chbani@decozin.com',
        price: 211
      },
      {
        id: 2,
        photo: 'order-painting-2.png',
        customer_phone: '+212630931997',
        customer_city: 'Casablanca',
        customer_country: 'Morocco',
        customer_address: '56, street 09, Casablanca, Morocco',
        status:  OrderStatus.PENDING as const,
        business_id: 1,
        order_type: 'gmail',
        customer_message: 'Hello i want this :)',
        customer_email: 'a.chbani@decozin.com',
        price: 209
      },
      {
        id: 3,
        photo: 'order-painting-3.png',
        customer_phone: '+212630931997',
        customer_city: 'Casablanca',
        customer_country: 'Morocco',
        customer_address: '56, street 09, Casablanca, Morocco',
        status:  OrderStatus.STARTED as const,
        business_id: 1,
        order_type: 'facebook',
        customer_message: 'Hello i want this :)',
        customer_email: 'a.chbani@decozin.com',
        price: 209
      },
      {
        id: 4,
        photo: 'order-painting-4.png',
        customer_phone: '+212630931997',
        customer_city: 'Casablanca',
        customer_country: 'Morocco',
        customer_address: '56, street 09, Casablanca, Morocco',
        status: OrderStatus.PENDING as const,
        business_id: 1,
        order_type: 'whatsapp',
        customer_message: 'Hello i want this :)',
        customer_email: 'a.chbani@decozin.com',
        price: 209
      },
    ];

    await this.connection.createQueryBuilder().insert().into(Orders).values(orders).execute();
  }

  async clearTable() {
    if(this.connection){
      await this.connection.query('SET FOREIGN_KEY_CHECKS=0;');
      await this.connection.query(`TRUNCATE TABLE ${'order_product'}`);
      await this.connection.query(`TRUNCATE TABLE ${'orders'}`);
      await this.connection.query('SET FOREIGN_KEY_CHECKS=1;');
    }
  }
}

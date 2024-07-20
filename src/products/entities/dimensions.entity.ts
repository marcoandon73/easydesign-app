import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne, OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Products } from './products.entity';
import {Timestamps} from "../../helpers/entities/timestamps.entity";
import {OrderProduct} from "../../orders/entities/orderProduct.entity";

@Index('dimensions_product_id_foreign', ['product_id'], {})
@Entity('dimensions', { schema: 'decozin' })
export class Dimensions extends Timestamps{
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @Column('double', { name: 'height', nullable: true, precision: 8, scale: 2 })
  height: number | null;

  @Column('double', { name: 'width', nullable: true, precision: 8, scale: 2 })
  width: number | null;

  @Column('int', { name: 'product_id', nullable: true, unsigned: true })
  product_id: number | null;

  @Column('double', { name: 'price', nullable: true, precision: 8, scale: 2 })
  price: number | null;

  @ManyToOne(() => Products, (products) => products.dimensions, {
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'product_id', referencedColumnName: 'id' }])
  product: Products;

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.dimension, {
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT',
  })
  order_products: OrderProduct[];
}

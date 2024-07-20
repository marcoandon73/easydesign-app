import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Orders } from './orders.entity';
import { Products } from '../../products/entities/products.entity';
import {Timestamps} from "../../helpers/entities/timestamps.entity";
import {Dimensions} from "../../products/entities/dimensions.entity";
import {SizesEntity} from "../../backgrounds/entities/sizes.entity";
import {BackgroundsEntity} from "../../backgrounds/entities/backgrounds.entity";

@Index('order_product_order_id_foreign', ['order_id'], {})
@Index('order_product_product_id_foreign', ['product_id'], {})
@Index('order_bg_id_foreign', ['bg_id'], {})
@Index('order_bg_size_id_foreign', ['bg_size_id'], {})
@Entity('order_product', { schema: 'decozin' })
export class OrderProduct extends Timestamps{
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @Column('bigint', { name: 'order_id', unsigned: true })
  order_id: number;

  @Column('int', { name: 'product_id', nullable: true, unsigned: true })
  product_id: number | null;

  @Column('int', { name: 'bg_id', nullable: true, unsigned: true })
  bg_id: number | null;

  @Column('int', { name: 'bg_size_id', nullable: true, unsigned: true })
  bg_size_id: number | null;

  @Column('bigint', { name: 'dimension_id', nullable: true, unsigned: true })
  dimension_id: number;

  @Column('varchar', { name: 'custom_photo', nullable: true, length: 255 })
  custom_product_photo: string | null;

  @ManyToOne(() => Orders, (orders) => orders.order_products, {
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'order_id', referencedColumnName: 'id' }])
  order: Orders;

  @ManyToOne(() => Products, (products) => products.order_products, {
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'product_id', referencedColumnName: 'id' }])
  product: Products;

  @ManyToOne(() => Dimensions, (dimensions) => dimensions.order_products, {
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'dimension_id', referencedColumnName: 'id' }])
  dimension: Dimensions;

  @ManyToOne(() => SizesEntity, (sizes) => sizes.order_products, {
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'bg_size_id', referencedColumnName: 'id' }])
  size: SizesEntity;


  @ManyToOne(() => BackgroundsEntity, (bgs) => bgs.order_products, {
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'bg_id', referencedColumnName: 'id' }])
  background: BackgroundsEntity;
}

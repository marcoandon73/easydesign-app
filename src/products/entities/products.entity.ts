import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Dimensions } from './dimensions.entity';
import { OrderProduct } from '../../orders/entities/orderProduct.entity';
import { Categories } from '../../categories/entities/categories.entity';
import { Stats } from '../../stats/entities/stats.entity';
import {Timestamps} from "../../helpers/entities/timestamps.entity";

@Index('products_category_id_foreign', ['category_id'], {})
@Entity('products', { schema: 'decozin' })
export class Products extends Timestamps{
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @Column('varchar', { name: 'photo', nullable: true, length: 255 })
  photo: string | null;

  @Column('varchar', { name: 'photo_thumb', nullable: true, length: 255 })
  photo_thumb: string | null;

  @Column('int', { name: 'order', nullable: true, unsigned: true })
  order: number | null;

  @Column('varchar', { name: 'name', nullable: true, length: 255 })
  name: string | null;

  @Column('varchar', { name: 'description', nullable: true, length: 255 })
  description: string | null;

  @Column('int', { name: 'price', nullable: true })
  price: number | null;

  @Column('double', { name: 'storage_size', nullable: true })
  storage_size: number | null;

  @Column('varchar', { name: 'dominating_color', nullable: true, length: 255 })
  dominating_color: string | null;

  @Column('int', { name: 'nbr_clicks', nullable: true })
  nbr_clicks: number | null;

  @Column('int', { name: 'nbr_views', nullable: true })
  nbr_views: number | null;

  @Column('int', { name: 'nbr_submits', nullable: true })
  nbr_submits: number | null;

  @Column('int', { name: 'category_id', nullable: true, unsigned: true })
  category_id: number | null;

  @Column('varchar', { name: 'link', nullable: true, length: 255 })
  link: string | null;

  @OneToMany(() => Dimensions, (dimensions) => dimensions.product)
  dimensions: Dimensions[];

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.product)
  order_products: OrderProduct[];

  @ManyToOne(() => Categories, (categories) => categories.products, {
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'category_id', referencedColumnName: 'id' }])
  category: Categories;

  @OneToMany(() => Stats, (stats) => stats.product)
  stats: Stats[];
}

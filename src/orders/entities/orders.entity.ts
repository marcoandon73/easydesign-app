import {
  BeforeRemove,
  Column,
  Entity, EntityRepository,
  Index,
  JoinColumn, ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn, Repository,
} from 'typeorm';
import {Businesses} from "../../businesses/entities/businesses.entity";
import {OrderProduct} from "./orderProduct.entity";
import {Timestamps} from "../../helpers/entities/timestamps.entity";
import {Products} from "../../products/entities/products.entity";
import {Locations} from "../../locations/entities/locations.entity";

@Index('orders_business_id_foreign', ['business_id'], {})
@Index('orders_location_id_foreign', ['location_id'], {})
@Entity('orders', { schema: 'decozin' })
export class Orders extends Timestamps{
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id', unsigned: true })
  id: number;

  @Column('varchar', { name: 'photo', nullable: true, length: 255 })
  photo: string | null;

  @Column('varchar', { name: 'order_type', nullable: true, length: 255 })
  order_type: string | null;

  @Column('varchar', { name: 'customer_name', nullable: true, length: 255 })
  customer_name: string | null;

  @Column('varchar', { name: 'customer_phone', nullable: true, length: 255 })
  customer_phone: string | null;

  @Column('varchar', { name: 'customer_city', nullable: true, length: 255 })
  customer_city: string | null;

  @Column('varchar', { name: 'customer_country', nullable: true, length: 255 })
  customer_country: string | null;

  @Column('varchar', { name: 'customer_address', nullable: true, length: 255 })
  customer_address: string | null;

  @Column('varchar', { name: 'customer_message', nullable: true, length: 255 })
  customer_message: string | null;

  @Column('varchar', { name: 'customer_email', nullable: true, length: 255 })
  customer_email: string | null;

  @Column('enum', {
    name: 'status',
    nullable: true,
    enum: ['pending', 'completed', 'canceled', 'started'],
  })
  status: 'pending' | 'completed' | 'canceled' | 'started' | null;

  @Column('int', { name: 'price', nullable: true })
  price: number | null;

  @Column('bigint', { name: 'background_id', nullable: true, unsigned: true })
  background_id: string | null;

  @Column('int', { name: 'business_id', nullable: true, unsigned: true })
  business_id: number | null;

  @Column('int', { name: 'location_id', nullable: true, unsigned: true })
  location_id: number | null;

  @ManyToOne(() => Locations, (locations) => locations.orders)
  @JoinColumn([{ name: 'location_id', referencedColumnName: 'id' }])
  location: Locations;

  @OneToMany(() => OrderProduct, (products) => products.order)
  order_products: OrderProduct[];

  @ManyToOne(() => Businesses, (businesses) => businesses.orders, {
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'business_id', referencedColumnName: 'id' }])
  business: Businesses;


  // @BeforeRemove()
  // async removeChildren(@EntityRepository(OrderProduct) childRepository: Repository<OrderProduct>) {
  //   await Promise.all(
  //     this.order_products.map(async order_product => {
  //       order_product.deleted_at = new Date();
  //       await order_product.save();
  //     }),
  //   );
  // }
}

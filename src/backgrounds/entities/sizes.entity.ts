import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Timestamps } from '../../helpers/entities/timestamps.entity';
import { OrderProduct } from '../../orders/entities/orderProduct.entity';
import { BackgroundsEntity } from './backgrounds.entity';

@Index('sizes_background_id_foreign', ['background_id'], {})
@Entity('sizes', { schema: 'decozin' })
export class SizesEntity extends Timestamps {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @Column('varchar', { name: 'label', nullable: true, length: 255 })
  label: string | null;

  @Column('int', { name: 'background_id', nullable: true, unsigned: true })
  background_id: number | null;

  @Column('double', { name: 'price', nullable: true, precision: 8, scale: 2 })
  price: number | null;

  @ManyToOne(() => BackgroundsEntity, (bg) => bg.sizes, {
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'background_id', referencedColumnName: 'id' }])
  background: BackgroundsEntity;

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.dimension, {
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT',
  })
  order_products: OrderProduct[];
}

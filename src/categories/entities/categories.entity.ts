import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Businesses } from '../../businesses/entities/businesses.entity';
import { Products } from '../../products/entities/products.entity';
import {Timestamps} from "../../helpers/entities/timestamps.entity";

@Index('categories_business_id_foreign', ['business_id'], {})
@Entity('categories', { schema: 'decozin' })
export class Categories extends Timestamps{
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @Column('varchar', { name: 'name', nullable: true, length: 255 })
  name: string | null;

  @Column('varchar', { name: 'description', nullable: true, length: 255 })
  description: string | null;

  @Column('varchar', { name: 'photo', nullable: true, length: 255 })
  photo: string | null;

  @Column('varchar', { name: 'photo_thumb', nullable: true, length: 255 })
  photo_thumb: string | null;

  @Column('int', { name: 'business_id', nullable: true, unsigned: true })
  business_id: number | null;

  @ManyToOne(() => Businesses, (businesses) => businesses.categories, {
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'business_id', referencedColumnName: 'id' }])
  business: Businesses;

  @OneToMany(() => Products, (products) => products.category)
  products: Products[];
}

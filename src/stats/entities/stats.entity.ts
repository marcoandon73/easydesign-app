import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {Businesses} from "../../businesses/entities/businesses.entity";
import {Products} from "../../products/entities/products.entity";
import {Timestamps} from "../../helpers/entities/timestamps.entity";

@Index('stats_product_id_foreign', ['product_id'], {})
@Index('stats_business_id_foreign', ['business_id'], {})
@Entity('stats', { schema: 'decozin' })
export class Stats extends Timestamps{
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id', unsigned: true })
  id: number;

  @Column('int', { name: 'nbr_whatsapp_submits', nullable: true })
  nbr_whatsapp_submits: number | null;

  @Column('int', { name: 'nbr_email_submits', nullable: true })
  nbr_email_submits: number | null;

  @Column('int', { name: 'nbr_facebook_submits', nullable: true })
  nbr_facebook_submits: number | null;

  @Column('int', { name: 'nbr_ask_phone_submits', nullable: true })
  nbr_ask_phone_submits: number | null;

  @Column('int', { name: 'product_id', nullable: true, unsigned: true })
  product_id: number | null;

  @Column('int', { name: 'business_id', nullable: true, unsigned: true })
  business_id: number | null;

  @ManyToOne(() => Businesses, (businesses) => businesses.stats, {
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'business_id', referencedColumnName: 'id' }])
  business: Businesses;

  @ManyToOne(() => Products, (products) => products.stats, {
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'product_id', referencedColumnName: 'id' }])
  product: Products;
}

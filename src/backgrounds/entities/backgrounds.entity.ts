import {Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import { Businesses } from '../../businesses/entities/businesses.entity';
import { Timestamps } from '../../helpers/entities/timestamps.entity';
import {RulesEntity} from "../../rules/entities/rules.entity";
import {SizesEntity} from "./sizes.entity";
import {OrderProduct} from "../../orders/entities/orderProduct.entity";
import {BgCategories} from "../../bgcategories/entities/bgcategories.entity";

@Index('backgrounds_category_id_foreign', ['category_id'], {})
@Index('backgrounds_business_id_foreign', ['business_id'], {})
@Entity('backgrounds', { schema: 'decozin' })
export class BackgroundsEntity extends Timestamps {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id', unsigned: true })
  id: number;

  @Column('varchar', { name: 'photo', nullable: true, length: 255 })
  photo: string | null;

  @Column('varchar', { name: 'photo_thumb', nullable: true, length: 255 })
  photo_thumb: string | null;

  @Column('int', { name: 'order', nullable: true, unsigned: true })
  order: number | null;

  @Column('int', { name: 'category_id', nullable: true, unsigned: true })
  category_id: number | null;

  @Column('varchar', { name: 'name', nullable: true, length: 255 })
  name: string | null;

  @Column('varchar', { name: 'description', nullable: true, length: 255 })
  description: string | null;

  @Column('int', { name: 'price', nullable: true })
  price: number | null;

  @Column('varchar', { name: 'dominating_color', nullable: true, length: 255 })
  dominating_color: string | null;

  @Column('int', { name: 'nbr_clicks', nullable: true })
  nbr_clicks: number | null;

  @Column('int', { name: 'nbr_views', nullable: true })
  nbr_views: number | null;

  @Column('int', { name: 'nbr_submits', nullable: true })
  nbr_submits: number | null;

  @Column('int', { name: 'business_id', nullable: true, unsigned: true })
  business_id: number | null;

  @ManyToOne(() => Businesses, (businesses) => businesses.backgrounds, {
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'business_id', referencedColumnName: 'id' }])
  business: Businesses;

  @Column('double', { name: 'storage_size', nullable: true })
  storage_size: number | null;

  @Column('int', { name: 'rule_id', nullable: true, unsigned: true })
  rule_id: number | null;

  @ManyToOne(() => RulesEntity, (rule) => rule.backgrounds, {
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'rule_id', referencedColumnName: 'id' }])
  rule: RulesEntity;

  @OneToMany(() => SizesEntity, (sizes) => sizes.background)
  sizes: SizesEntity[];

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.background, {
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT',
  })
  order_products: OrderProduct[];

  @ManyToOne(() => BgCategories, (categpry) => categpry.backgrounds,{
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'category_id', referencedColumnName: 'id' }])
  category: BgCategories;
}

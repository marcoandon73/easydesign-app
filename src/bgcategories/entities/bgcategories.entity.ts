import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Businesses } from '../../businesses/entities/businesses.entity';
import { Timestamps } from '../../helpers/entities/timestamps.entity';
import { BackgroundsEntity } from '../../backgrounds/entities/backgrounds.entity';

@Index('bg_categories_business_id_foreign', ['business_id'], {})
@Entity('bg_categories', { schema: 'decozin' })
export class BgCategories extends Timestamps {
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

  @OneToMany(() => BackgroundsEntity, (bgs) => bgs.category)
  backgrounds: BackgroundsEntity[];
}

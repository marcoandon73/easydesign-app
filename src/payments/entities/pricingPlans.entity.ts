import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PricingPlansTerms } from './pricingPlansTerms.entity';
import {Timestamps} from "../../helpers/entities/timestamps.entity";

@Entity('pricing_plans', { schema: 'decozin' })
export class PricingPlans extends Timestamps{
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id', unsigned: true })
  id: number;

  @Column('varchar', { name: 'name', length: 255 })
  name: string;

  @Column('varchar', { name: 'duration_unit', nullable: true, length: 255 })
  durationUnit: string | null;

  @Column('int', { name: 'price', nullable: true })
  price: number | null;

  @Column('varchar', { name: 'image', nullable: true, length: 255 })
  image: string | null;

  @Column('nvarchar', {
    name: 'currency_code',
    length: 255,
    default: 'USD',
  })
  currencyCode: string;

  @Column('int', { name: 'number_of_duration', nullable: true })
  numberOfDuration: number | null;

  @OneToMany(() => PricingPlansTerms, (pricingPlansTerms) => pricingPlansTerms.pricingPlan)
  pricingPlansTerms: PricingPlansTerms[];
}

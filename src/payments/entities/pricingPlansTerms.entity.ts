import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {PricingPlans} from "./pricingPlans.entity";
import {Timestamps} from "../../helpers/entities/timestamps.entity";


@Index('pricing_plans_terms_pricing_plan_id_foreign', ['pricingPlanId'], {})
@Entity('pricing_plans_terms', { schema: 'decozin' })
export class PricingPlansTerms extends Timestamps{
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id', unsigned: true })
  id: number;

  @Column('varchar', { name: 'resource', length: 255 })
  resource: string;

  @Column('text', { name: 'description', nullable: true })
  description: string | null;

  @Column('varchar', { name: 'price', nullable: true, length: 255 })
  price: string | null;

  @Column('varchar', { name: 'qte', nullable: true, length: 255 })
  qte: string | null;

  @Column('varchar', { name: 'unit', nullable: true, length: 255 })
  unit: string | null;

  @Column('bigint', { name: 'pricing_plan_id', unsigned: true })
  pricingPlanId: string;

  @ManyToOne(
    () => PricingPlans,
    (pricingPlans) => pricingPlans.pricingPlansTerms,
    { onDelete: 'CASCADE', onUpdate: 'RESTRICT' }
  )
  @JoinColumn([{ name: 'pricing_plan_id', referencedColumnName: 'id' }])
  pricingPlan: PricingPlans;
}

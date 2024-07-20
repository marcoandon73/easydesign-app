import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Businesses } from '../../businesses/entities/businesses.entity';
import { UsersEntity } from '../../users/entities/users.entity';
import { Timestamps } from '../../helpers/entities/timestamps.entity';

@Index('payments_token_unique', ['token'], { unique: true })
@Index('payments_user_id_foreign', ['user_id'], {})
@Index('payments_business_id_foreign', ['business_id'], {})
@Entity('payments', { schema: 'decozin' })
export class Payments extends Timestamps {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id', unsigned: true })
  id: number;

  @Column('timestamp', { name: 'validated_at', nullable: true })
  validated_at: Date | null;

  @Column('varchar', { name: 'transaction_id', nullable: true, length: 255 })
  transaction_id: string | null;

  @Column('varchar', {
    name: 'transaction_status',
    nullable: true,
    length: 255,
  })
  transaction_status: string | null;

  @Column('timestamp', { name: 'starts_at', nullable: true })
  starts_at: Date | null;

  @Column('timestamp', { name: 'ends_at', nullable: true })
  ends_at: Date | null;

  @Column('varchar', { name: 'slug', nullable: true, length: 255 })
  slug: string | null;

  @Column('decimal', {
    name: 'balance_us',
    nullable: true,
    precision: 8,
    scale: 5,
  })
  balance_us: string | null;

  @Column('int', { name: 'pricing_plan_id', nullable: true })
  pricing_plan_id: number | null;

  @Column('int', { name: 'for_year', nullable: true })
  for_year: number | null;

  @Column('double', {
    name: 'amount_to_pay_conversion',
    nullable: true
  })
  amount_to_pay_conversion: number | null;

  @Column('double', {
    name: 'amount_to_pay_storage',
    nullable: true
  })
  amount_to_pay_storage: number | null;

  @Column('varchar', { name: 'token', unique: true, length: 255 })
  token: string;

  @Column('int', { name: 'user_id', unsigned: true })
  user_id: number;

  @Column('int', { name: 'business_id', unsigned: true })
  business_id: number;

  @ManyToOne(() => Businesses, (businesses) => businesses.payments, {
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'business_id', referencedColumnName: 'id' }])
  business: Businesses;

  @ManyToOne(() => UsersEntity, (users) => users.payments, {
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: UsersEntity;
}

import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Businesses } from '../../businesses/entities/businesses.entity';
import { UsersEntity } from '../../users/entities/users.entity';
import {Timestamps} from "../../helpers/entities/timestamps.entity";

@Index('payments_alerts_user_id_foreign', ['user_id'], {})
@Index('payments_alerts_business_id_foreign', ['business_id'], {})
@Entity('payments_alerts', { schema: 'decozin' })
export class PaymentsAlerts extends Timestamps{
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id', unsigned: true })
  id: number;

  @Column('varchar', { name: 'message', nullable: true, length: 255 })
  message: string | null;

  @Column('int', { name: 'user_id', unsigned: true })
  user_id: number;

  @Column('int', { name: 'business_id', unsigned: true })
  business_id: number;

  @ManyToOne(() => Businesses, (businesses) => businesses.payments_alerts, {
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'business_id', referencedColumnName: 'id' }])
  business: Businesses;

  @ManyToOne(() => UsersEntity, (users) => users.paymentsAlerts, {
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: UsersEntity;
}

import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Businesses } from '../../businesses/entities/businesses.entity';

@Index('storage_consumptions_business_id_foreign', ['business_id'], {})
@Entity('storage_consumptions', { schema: 'decozin' })
export class StorageConsumptionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', unsigned: true, update: false })
  business_id: number;

  @Column({ type: 'date' })
  month: Date;

  @Column({ type: 'int' })
  year: number;

  @Column({ type: 'double' })
  size: number;

  @CreateDateColumn({
    update: false,
  })
  created_at: number;

  @ManyToOne(() => Businesses, (business) => business.storage_actions, {
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'business_id', referencedColumnName: 'id' }])
  business: Businesses;
}

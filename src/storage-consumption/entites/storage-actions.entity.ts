import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UsersEntity } from '../../users/entities/users.entity';
import { Businesses } from '../../businesses/entities/businesses.entity';

@Index('storage_actions_business_id_foreign', ['business_id'], {})
@Index('storage_actions_created_by_foreign', ['created_by'], {})
@Entity('storage_actions', { schema: 'decozin' })
export class StorageActionsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', unsigned: true, nullable: true, update: false })
  business_id;

  @Column({ type: 'varchar' })
  file_name: string;

  @Column({ type: 'double' })
  file_size: number;

  @Column({ type: 'varchar' })
  action: string;

  @Column({ type: 'varchar' })
  message: string;

  @Column({
    type: 'bigint',
    unsigned: true,
    nullable: true,
  })
  created_by: number;

  @CreateDateColumn({
    update: false,
  })
  created_at: Date;

  @ManyToOne(() => UsersEntity, (users) => users.storage_actions, {
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'created_by', referencedColumnName: 'id' }])
  user: UsersEntity;

  @ManyToOne(() => Businesses, (business) => business.storage_actions, {
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'business_id', referencedColumnName: 'id' }])
  business: Businesses;
}

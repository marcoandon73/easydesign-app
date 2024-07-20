import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Timestamps } from '../../helpers/entities/timestamps.entity';

@Entity('verify_users', { schema: 'decozin' })
export class VerifyUsersEntity extends Timestamps {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id', unsigned: true })
  id: number;

  @Column('int', { name: 'user_id' })
  userId: number;

  @Column('varchar', { name: 'token', length: 255 })
  token: string;
}

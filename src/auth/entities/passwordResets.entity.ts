import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import {Timestamps} from "../../helpers/entities/timestamps.entity";

@Index('password_resets_email_index', ['email'], {})
@Entity('password_resets', { schema: 'decozin' })
export class PasswordResetsEntity extends Timestamps{

  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id', unsigned: true })
  id: number;

  @Column('varchar', { name: 'email', length: 255 })
  email: string;

  @Column('varchar', { name: 'token', length: 255 })
  token: string;


}

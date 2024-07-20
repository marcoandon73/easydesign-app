import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import {Timestamps} from "../../helpers/entities/timestamps.entity";

@Entity('tasks')

export class User extends Timestamps{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  description2: string;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column()
  status: boolean;
}

import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import { Timestamps } from '../../helpers/entities/timestamps.entity';
import {BackgroundsEntity} from "../../backgrounds/entities/backgrounds.entity";

@Entity('rules', { schema: 'decozin' })
export class RulesEntity extends Timestamps {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id', unsigned: true })
  id: number;

  @Column('varchar', { name: 'name', nullable: true })
  name: string | null;

  @Column('int', { name: 'parent_width', nullable: true })
  parent_width: number | null;

  @Column('int', { name: 'parent_height', nullable: true })
  parent_height: number | null;

  @Column('int', { name: 'width', nullable: true })
  width: number | null;

  @Column('int', { name: 'height', nullable: true })
  height: number | null;

  @Column('int', { name: 'x', nullable: true })
  x: number | null;

  @Column('int', { name: 'y', nullable: true })
  y: number | null;

  @OneToMany(() => BackgroundsEntity, (backgrounds) => backgrounds.rule, {
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT',
  })
  backgrounds: BackgroundsEntity[];
}

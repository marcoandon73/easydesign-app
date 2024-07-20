import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne, OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {Businesses} from "../../businesses/entities/businesses.entity";
import {Timestamps} from "../../helpers/entities/timestamps.entity";

@Index('parameters_business_id_foreign', ['business_id'], {})
@Entity('parameters', { schema: 'decozin' })
export class Parameters extends Timestamps{
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id', unsigned: true })
  id: number;

  @Column('tinyint', {
    name: 'multiple_products_by_order',
    width: 1,
    default: 0
  })
  multiple_products_by_order: boolean;

  @Column('tinyint', {
    name: 'customizable_logo',
    width: 1,
    default: 0
  })
  customizable_logo: boolean;

  @Column('varchar', {
    name: 'primary_color',
    length: 255,
    default: '#000',
  })
  primary_color: string;

  @Column('varchar', {
    name: 'secondary_color',
    length: 255,
    default: '#4b68af',
  })
  secondary_color: string;

  @Column('tinyint', { name: 'empty_bg', width: 1, default: 1 })
  empty_bg: boolean;

  @Column('tinyint', { name: 'show_whatsapp', width: 1, default: 0 })
  show_whatsapp: boolean;

  @Column('tinyint', { name: 'show_facebook', width: 1, default: 0 })
  show_facebook: boolean;

  @Column('tinyint', { name: 'show_gmail', width: 1, default: 0 })
  show_gmail: boolean;

  @Column('tinyint', { name: 'show_ask_phone', width: 1, default: 0 })
  show_ask_phone: boolean;

  @Column('tinyint', {
    name: 'show_first_step',
    width: 1,
    default: 1
  })
  show_first_step: boolean;

  @Column('tinyint', {
    name: 'show_second_step',
    width: 1,
    default: 1
  })
  show_second_step: boolean;

  @Column('tinyint', {
    name: 'show_third_step',
    width: 1,
    default: 1
  })
  show_third_step: boolean;

  @Column('tinyint', { name: 'show_shadow', nullable: true, width: 1 })
  show_shadow: boolean | null;

  @Column('varchar', {
    name: 'unit',
    nullable: true,
    length: 255,
    default: 'm(SI)',
  })
  unit: string | null;

  @Column('enum', {
    name: 'startup_step',
    enum: ['1', '2', '3'],
    default: 1
  })
  startup_step: '1' | '2' | '3';

  @Column('varchar', { name: 'lang', length: 255, default:  'en' })
  lang: string;

  @Column('int', { name: 'business_id', unsigned: true })
  business_id: number;

  @OneToOne(() => Businesses, (businesses) => businesses.parameter, {
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'business_id', referencedColumnName: 'id' }])
  business: Businesses;

  can_update_settings = true;
}

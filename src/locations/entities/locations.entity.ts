import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Businesses } from '../../businesses/entities/businesses.entity';
import { Pricings } from '../../payments/entities/pricings.entity';
import {Timestamps} from "../../helpers/entities/timestamps.entity";
import {Orders} from "../../orders/entities/orders.entity";

@Entity('locations', { schema: 'decozin' })
export class Locations extends Timestamps{
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id', unsigned: true })
  id: number;

  @Column('varchar', { name: 'country_name', nullable: true, length: 255 })
  country_name: string | null;

  @Column('varchar', { name: 'region', nullable: true, length: 255 })
  region: string | null;

  @Column('varchar', {
    name: 'native_country_name',
    nullable: true,
    length: 255,
  })
  nativeCountryName: string | null;

  @Column('varchar', { name: 'numericCode', nullable: true, length: 255 })
  numericCode: string | null;

  @Column('nvarchar', { name: 'currency_code', nullable: true, length: 255 })
  currency_code: string | null;

  @Column('nvarchar', { name: 'currency_symbol', nullable: true, length: 255 })
  currency_symbol: string | null;

  @Column('nvarchar', { name: 'currency_name', nullable: true, length: 255 })
  currency_name: string | null;

  @Column('varchar', { name: 'language', nullable: true, length: 255 })
  language: string | null;

  @Column('varchar', {
    name: 'language_native_name',
    nullable: true,
    length: 255,
  })
  languageNativeName: string | null;

  @Column('varchar', { name: 'flag', nullable: true, length: 255 })
  flag: string | null;

  @OneToMany(() => Businesses, (businesses) => businesses.location)
  businesses: Businesses[];

  @OneToMany(() => Orders, (orders) => orders.location)
  orders: Businesses[];

  @OneToMany(() => Pricings, (pricings) => pricings.location)
  pricings: Pricings[];


}

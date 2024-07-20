import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {Locations} from "../../locations/entities/locations.entity";
import {Timestamps} from "../../helpers/entities/timestamps.entity";


@Index('pricings_location_id_foreign', ['locationId'], {})
@Entity('pricings', { schema: 'decozin' })
export class Pricings extends Timestamps{
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id', unsigned: true })
  id: number;

  @Column('bigint', { name: 'location_id', unsigned: true })
  locationId: string;

  @Column('decimal', { name: 'whatsapp_price_usd', precision: 8, scale: 5 })
  whatsappPriceUsd: string;

  @Column('decimal', { name: 'ask_phone_price_us', precision: 8, scale: 5 })
  askPhonePriceUs: string;

  @Column('decimal', { name: 'email_price_us', precision: 8, scale: 5 })
  emailPriceUs: string;

  @Column('decimal', { name: 'facebook_price_us', precision: 8, scale: 5 })
  facebookPriceUs: string;

  @Column('decimal', { name: 'storage_pricing_gbs_us', precision: 8, scale: 5 })
  storagePricingGbsUs: string;

  @ManyToOne(() => Locations, (locations) => locations.pricings, {
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'location_id', referencedColumnName: 'id' }])
  location: Locations;
}

import { Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Locations } from '../../locations/entities/locations.entity';
import { Categories } from '../../categories/entities/categories.entity';
import { Orders } from '../../orders/entities/orders.entity';
import { Payments } from '../../payments/entities/payments.entity';
import { PaymentsAlerts } from '../../payments/entities/paymentsAlerts.entity';
import { Ratings } from '../../rating/entities/ratings.entity';
import { Stats } from '../../stats/entities/stats.entity';
import { Parameters } from '../../settings/entities/parameters.entity';
import { Timestamps } from '../../helpers/entities/timestamps.entity';
import { UsersEntity } from '../../users/entities/users.entity';
import { StorageActionsEntity } from '../../storage-consumption/entites/storage-actions.entity';
import { StorageConsumptionEntity } from '../../storage-consumption/entites/storage-consumption.entity';
import { BackgroundsEntity } from '../../backgrounds/entities/backgrounds.entity';
import {BgCategories} from "../../bgcategories/entities/bgcategories.entity";


@Index('businesses_location_id_foreign', ['location_id'], {})
@Entity('businesses', { schema: 'decozin' })
export class Businesses extends Timestamps {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @Column('varchar', { name: 'name', length: 255 })
  name: string;

  @Column('varchar', { name: 'slug', length: 255 })
  slug: string;

  @Column('timestamp', { name: 'blocked_for_payment', nullable: true })
  blocked_for_payment: Date | null;

  @Column('timestamp', { name: 'blocked_at', nullable: true })
  blocked_at: Date | null;

  @Column('varchar', {
    name: 'logo',
    length: 255,
    nullable: true,
  })
  logo: string;

  @Column('varchar', { name: 'description', nullable: true, length: 255 })
  description: string | null;

  @Column('varchar', { name: 'phone', nullable: true, length: 255 })
  phone: string | null;

  @Column('varchar', { name: 'messenger_link', nullable: true, length: 255 })
  messenger_link: string | null;

  @Column('bigint', { name: 'location_id', unsigned: true })
  location_id: number;

  @Column('int', { name: 'pricing_plan_id', nullable: true })
  pricing_plan_id: number | null;

  @Column('varchar', { name: 'email', unique: false, nullable: true, length: 255 })
  email: string;

  @Column('varchar', { name: 'website', nullable: true, length: 255 })
  website: string | null;

  @Column('varchar', { name: 'address', nullable: true, length: 255 })
  address: string | null;

  @OneToMany(() => BackgroundsEntity, (backgrounds) => backgrounds.business)
  backgrounds: BackgroundsEntity[];

  @ManyToMany(() => UsersEntity, (usersEntity) => usersEntity.businesses)
  @JoinTable({
    name: 'business_user',
    joinColumns: [{ name: 'business_id', referencedColumnName: 'id' }],
    inverseJoinColumns: [{ name: 'user_id', referencedColumnName: 'id' }],
    schema: 'decozin',
  })
  users: UsersEntity[];

  @ManyToOne(() => Locations, (locations) => locations.businesses, {
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'location_id', referencedColumnName: 'id' }])
  location: Locations;

  @OneToMany(() => Categories, (categories) => categories.business)
  categories: Categories[];

  @OneToMany(() => BgCategories, (bg_categories) => bg_categories.business)
  bg_categories: BgCategories[];

  @OneToMany(() => Orders, (orders) => orders.business)
  orders: Orders[];

  @OneToOne(() => Parameters, (parameters) => parameters.business, { eager: true })
  parameter: Parameters;

  @OneToMany(() => Payments, (payments) => payments.business)
  payments: Payments[];

  @OneToMany(() => PaymentsAlerts, (paymentsAlerts) => paymentsAlerts.business)
  payments_alerts: PaymentsAlerts[];

  @OneToMany(() => Ratings, (ratings) => ratings.business)
  ratings: Ratings[];

  @OneToMany(() => Stats, (stats) => stats.business)
  stats: Stats[];

  @OneToMany(() => StorageActionsEntity, (storageActions) => storageActions.business)
  storage_actions: StorageActionsEntity[];

  @OneToMany(() => StorageConsumptionEntity, (storageConsumption) => storageConsumption.business)
  storage_consumptions: StorageConsumptionEntity[];
}

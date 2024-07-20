import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
// import { BusinessUser } from '../../businesses/entities/businessUser.entity';
import { Payments } from '../../payments/entities/payments.entity';
import { PaymentsAlerts } from '../../payments/entities/paymentsAlerts.entity';
import { Timestamps } from '../../helpers/entities/timestamps.entity';
import { Roles } from '../../roles/entities/roles.entity';
import { Businesses } from '../../businesses/entities/businesses.entity';
import {StorageActionsEntity} from "../../storage-consumption/entites/storage-actions.entity";
import {Ratings} from "../../rating/entities/ratings.entity";

@Index('users_email_unique', ['email'], { unique: true })
@Index('users_role_id_foreign', ['roleId'], {})
@Entity('users', { schema: 'decozin' })
export class UsersEntity extends Timestamps {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @Column('varchar', { name: 'lastname', nullable: true, length: 255 })
  lastname: string | null;

  @Column('varchar', { name: 'name', nullable: true, length: 255 })
  name: string | null;

  @Column('varchar', { name: 'firstname', nullable: true, length: 255 })
  firstname: string | null;

  @Column('varchar', { name: 'address', nullable: true, length: 255 })
  address: string | null;

  @Column('varchar', { name: 'phone', nullable: true, length: 255 })
  phone: string | null;

  @Column('tinyint', { name: 'isActive', width: 1, default: 1 })
  isActive: number;

  @Column('varchar', { name: 'email', unique: true, length: 255 })
  email: string;

  @Column('varchar', { name: 'provider', nullable: true, length: 255 })
  provider: string | null;

  @Column('varchar', { name: 'provider_user_id', nullable: true, length: 255 })
  provider_user_id: string | null;

  @Column('varchar', {
    name: 'avatar',
    length: 255,
    nullable: true
  })
  avatar: string;

  @Column('timestamp', { name: 'email_verified_at', nullable: true })
  email_verified_at: Date | null;

  @Column('varchar', { name: 'password', length: 255 })
  password: string;

  @Column('varchar', { name: 'salt', length: 255 })
  salt: string;

  @Column('varchar', { name: 'remember_token', nullable: true, length: 100 })
  remember_token: string | null;

  // @OneToMany(() => BusinessUser, (businessUser) => businessUser.user)
  // businessUsers: BusinessUser[];

  @OneToMany(() => Payments, (payments) => payments.user)
  payments: Payments[];

  @Column('int', { name: 'roleId', nullable: true, unsigned: true })
  roleId: number | null;

  @ManyToOne(() => Roles, (role) => role.users)
  // @JoinColumn([{ name: 'roleId', referencedColumnName: 'id' }])
  role: Roles;

  @OneToMany(() => PaymentsAlerts, (paymentsAlerts) => paymentsAlerts.user)
  paymentsAlerts: PaymentsAlerts[];

  @ManyToMany(() => Businesses, (businesses) => businesses.users)
  @JoinTable({
    name: 'business_user',
    joinColumns: [{ name: 'user_id', referencedColumnName: 'id' }],
    inverseJoinColumns: [{ name: 'business_id', referencedColumnName: 'id' }],
    schema: 'decozin',
  })
  businesses: Businesses[];

  @OneToMany(() => StorageActionsEntity, (storageActions) => storageActions.user)
  storage_actions: StorageActionsEntity[];

  @OneToMany(() => Ratings, (ratings) => ratings.user)
  ratings: Ratings;
}

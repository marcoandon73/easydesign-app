import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Businesses } from '../../businesses/entities/businesses.entity';
import { Timestamps } from '../../helpers/entities/timestamps.entity';
import { UsersEntity } from '../../users/entities/users.entity';

@Index('ratings_business_id_foreign', ['business_id'], {})
@Entity('ratings', { schema: 'decozin' })
export class Ratings extends Timestamps {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @Column('varchar', { name: 'rating_percent', nullable: true, length: 255 })
  ratingPercent: string | null;

  @Column('bigint', { name: 'user_id', nullable: true, unsigned: true })
  user_id: string | null;

  @ManyToOne(() => UsersEntity, (usersEntity) => usersEntity.ratings)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: UsersEntity;

  @Column('varchar', { name: 'message', nullable: true, length: 255 })
  message: string | null;

  @Column('int', { name: 'business_id', nullable: true, unsigned: true })
  business_id: number | null;

  @ManyToOne(() => Businesses, (businesses) => businesses.ratings, {
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'business_id', referencedColumnName: 'id' }])
  business: Businesses;
  //
  // get stars(): number {
  //   return this.ratingPercent ? (Number(this.ratingPercent) / 100) * 5 : null;
  // }
}

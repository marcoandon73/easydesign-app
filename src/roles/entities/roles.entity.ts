import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import { Permissions } from './permissions.entity';
import { Timestamps } from '../../helpers/entities/timestamps.entity';
import { UsersEntity } from '../../users/entities/users.entity';

@Entity('roles', { schema: 'decozin' })
export class Roles extends Timestamps {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id', unsigned: true })
  id: number;

  @Column('varchar', { name: 'name', length: 255 })
  name: string;

  @Column('varchar', { name: 'description', length: 255, nullable: true })
  description: string;

  @Column('varchar', { name: 'guard_name', length: 255, nullable: true })
  guard_name: string;

  @OneToMany(() => UsersEntity, (users) => users.role)
  // @JoinTable({
  //   name: 'user_has_roles',
  //   joinColumns: [{ name: 'role_id', referencedColumnName: 'id' }],
  //   inverseJoinColumns: [{ name: 'user_id', referencedColumnName: 'id' }],
  //   schema: 'decozin',
  // })
  users: UsersEntity[];

  @ManyToMany(() => Permissions, (permissions) => permissions.roles)
  permissions: Permissions[];
}

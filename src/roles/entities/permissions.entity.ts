import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Roles } from './roles.entity';
import { Timestamps } from '../../helpers/entities/timestamps.entity';

@Entity('permissions', { schema: 'decozin' })
export class Permissions extends Timestamps {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id', unsigned: true })
  id: number;

  @Column('varchar', { name: 'name', length: 255 })
  name: string;

  @Column('varchar', { name: 'guard_name', length: 255, nullable: true })
  guard_name: string;

  @ManyToMany(() => Roles, (roles) => roles.permissions)
  @JoinTable({
    name: 'role_has_permissions',
    joinColumns: [{ name: 'permission_id', referencedColumnName: 'id' }],
    inverseJoinColumns: [{ name: 'role_id', referencedColumnName: 'id' }],
    schema: 'decozin',
  })
  roles: Roles[];
}

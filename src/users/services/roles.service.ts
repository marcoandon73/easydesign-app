import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {FindOperator, In, Repository} from 'typeorm';
import { UsersDTO } from '../dto/user.dto';
import { UsersEntity } from '../entities/users.entity';
import { Roles } from '../../roles/entities/roles.entity';
import { Permissions } from '../../roles/entities/permissions.entity';
import { User } from '../../tasks/entities/task.entity';

// This should be a real class/interface representing a user entity
// export type User = any;

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(UsersEntity) private readonly usersRepository: Repository<UsersEntity>,
    @InjectRepository(Permissions) private readonly permissionRepository: Repository<Permissions>,
    @InjectRepository(Roles) private readonly rolesRepository: Repository<Roles>,
  ) {}

  async getRoles(): Promise<Array<Record<any, any>>> {
    return await this.rolesRepository.find();
  }

  getAll(user: UsersEntity) {
    const query = this.rolesRepository
      .createQueryBuilder('role')
      .where('role.id >= :id', { id: user.roleId })
      .orderBy('role.id', 'ASC');
    return query.getMany();
  }

  async getPermissions(): Promise<Array<Record<any, any>>> {
    return await this.permissionRepository.find();
  }

  async getPermissionsByRole(roleId): Promise<Array<Record<any, any>>> {
    return await this.permissionRepository.find({ roles: [roleId] });
  }

  async getUserRoles(userId): Promise<Array<Record<any, any>>> {
    return await this.rolesRepository.find({ users: [userId] });
  }

  async assignRoleToUser(userId: number, roleId: number) {
    const [user, role] = await Promise.all([this.usersRepository.findOne({ id: userId }), this.rolesRepository.findOne({ id: roleId })]);

    user.role = role;
    return await this.usersRepository.save(user);
  }

  async revokeRoleFromUser(userId: number) {
    const user = await this.usersRepository.findOne({ id: userId });
    user.role = null;
    return await this.usersRepository.save(user);
  }

  async hasRoles(user, roles: string[]) {
    const query = await this.usersRepository.createQueryBuilder('user')
      .select('user.id')
     .leftJoin('user.role', 'role')
      .where('user.id = :userId', { userId: user.id })
      .andWhere('user.deleted_at IS NULL')
      .andWhere('role.name IN (:...roles)', { roles })
      .getCount();
    return query ? true : false;
  }

  async hasPermission(userId: number, permissionId: number) {
    const user = await this.usersRepository.findOne(
      { id: userId },
      {
        relations: ['role'],
      },
    );

    const permissions = await this.permissionRepository.find({ roles: [user.role] });
    return permissions.some((item) => item.id === permissionId);
  }

  async getUserPermissions(userId: number) {
    const user = await this.usersRepository.findOne(
      { id: userId },
      {
        relations: ['role'],
      },
    );
    if (user?.role) {
      return await this.permissionRepository.find({ roles: [user.role] });
    }
    return [];
  }

  async getUserRole(user: UsersEntity){
    return await this.rolesRepository.findOne({ id: user.role.id });
  }

  async grantPermissionToRole(roleId: number, permissionId: number) {
    const [role, permission] = await Promise.all([
      this.rolesRepository.findOne({ id: roleId }),
      this.permissionRepository.findOne({ id: permissionId }),
    ]);
    if (role && permission) {
      role.permissions.push(permission);
    }
    return await this.rolesRepository.save(role);
  }

  async revokePermissionFromRole(roleId: number, permissionId: number) {
    const [role, permission] = await Promise.all([
      this.rolesRepository.findOne(
        { id: roleId },
        {
          relations: ['permissions'],
        },
      ),
      this.permissionRepository.findOne({ id: permissionId }),
    ]);
    if (role && permission && role.permissions?.length > 0) {
      role.permissions.filter((permission) => permission.id !== permissionId);
    }
    return await this.rolesRepository.save(role);
  }

  async getRoleByName(role_name: string) {
    return await this.rolesRepository.findOne({ name: role_name });
  }
}

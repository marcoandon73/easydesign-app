import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {In, Repository} from 'typeorm';
import { UsersDTO } from '../dto/user.dto';
import { UsersEntity } from '../entities/users.entity';
import { Roles } from '../../roles/entities/roles.entity';
import { UpdateProfileDto } from '../dto/updateProfile.dto';
import { User } from '../../tasks/entities/task.entity';
import * as bcrypt from 'bcrypt';
import { plainToClass } from 'class-transformer';
import { ImagesService } from '../../images/services/images.service';
import { UpdateUserDto } from '../dto/update-user.dto';
import { GetUserDto } from '../dto/get-user.dto';
import { DeleteUserDto } from '../dto/delete-user.dto';
import { BlockUserDto } from '../dto/block-user.dto';
import { GetAllUsersDto } from '../dto/get-all-users.dto';
import {BusinessesService} from "../../businesses/services/businesses.service";
import {RolesService} from "./roles.service";
import {AddUserDto} from "../dto/add-user.dto";
import {UpdateMyPasswordDto} from "../dto/UpdateMyPassword.dto";
// This should be a real class/interface representing a user entity
// export type User = any;
const saltSize = 10;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity) private readonly usersRepository: Repository<UsersEntity>,
    private imagesService: ImagesService,
    private businessesService: BusinessesService,
    private rolesService: RolesService,
  ) {}

  async create(createUserDto: AddUserDto, connectedUser): Promise<UsersEntity> {
    const user = new UsersEntity();

    if( connectedUser && createUserDto.roleId < connectedUser.roleId ){
      throw new UnauthorizedException('You are not allowed to create a user with a higher role');
    }
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.phone = createUserDto.phone;
    if (createUserDto.salt) {
      user.salt = createUserDto.salt;
    } else {
      user.salt = await bcrypt.genSalt(saltSize);
    }
    user.password = bcrypt.hashSync(createUserDto.password, user.salt);

    const data = await this.usersRepository.save(user);
    if (createUserDto.business_id) {
      await this.businessesService.attachUserToBusiness(data, createUserDto.business_id);
    }
    return await this.rolesService.assignRoleToUser(data.id, createUserDto.roleId);
  }

  async selfUpdate(user: UsersEntity): Promise<UsersEntity> {
    return await this.usersRepository.save({ ...user});
  }

  async findAll(params: GetAllUsersDto, user) {
    const pageSize = params?.pageSize || 10;
    const page = params?.page || 1;
    if (!(await this.rolesService.hasRoles(user, ['admin', 'super']))) {
      throw new UnauthorizedException('You are not allowed to perform this action');
    }
    const users = await this.usersRepository
      .createQueryBuilder('users')
      .leftJoin('users.businesses', 'business')
      .leftJoinAndSelect('users.role', 'role')
      .where('users.deleted_at IS NULL')
      .andWhere('business.deleted_at IS NULL')
      .andWhere('business.id = :businessId', { businessId: params.business_id })
      .andWhere('users.roleId >= :roleId', { roleId: user.roleId })
      .take(pageSize)
      .skip((page - 1) * pageSize);
    const total = await users.getCount();
    const data = await users.getMany();
    return {
      data,
      page,
      pageSize,
      total
    };
  }

  async findOne(email: string, relations: Array<string> = []): Promise<UsersEntity> {
    const qb = this.usersRepository.createQueryBuilder('users');
    if (relations) {
      relations.forEach((relation) => {
        if (relation === 'businesses') {
          qb.leftJoinAndSelect('users.businesses', 'businesses');
          qb.leftJoinAndSelect('businesses.parameter', 'parameter');
        } else {
          qb.leftJoinAndSelect('users.' + relation, relation);
        }
      });
    }
    // .leftJoinAndMapMany('users.roles', Roles, 'roles', 'users.id = :id', { id: 1 })
    qb.where('users.email = :email', { email });
    return await qb.getOne();
  }

  async findOneById(id, relations: Array<string> = []): Promise<UsersEntity> {
    const qb = this.usersRepository.createQueryBuilder('users');
    if (relations?.length > 0) {
      relations.forEach((relation) => {
        if (relation === 'businesses') {
          qb.leftJoinAndSelect('users.businesses', 'businesses');
          qb.leftJoinAndSelect('businesses.parameter', 'parameter');
        } else {
          qb.leftJoinAndSelect('users.' + relation, relation);
        }
      });
    }
    // .leftJoinAndMapMany('users.roles', Roles, 'roles', 'users.id = :id', { id: 1 })
    qb.where('users.id = :id', { id });
    return await qb.getOne();
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async getRoles() {
    // return this.usersRepository.ge
  }

  async isEmailUnique(email) {
    const res = await this.usersRepository.find({ email, deleted_at: null });
    if (res?.length > 0) {
      return false;
    }
    return true;
  }

  async updateProfile(params: UpdateProfileDto, user: UsersEntity, avatar = null) {
    if (params.password && params.old_password) {
      // check old password is correct
      const oldHashedPassword = bcrypt.hashSync(params.old_password, user.salt);
      const isValid = await bcrypt.compare(user.password, oldHashedPassword);
      if (!isValid) {
        throw new UnauthorizedException('Old password is incorrect');
      }
    } else {
      delete params.password;
      delete params.old_password;
      delete params.email;
    }
    if (avatar instanceof Object) {
      if (user.avatar) {
        await this.imagesService.removePhoto(user.avatar, 'profiles', user, null);
      }
      const storedPhoto = await this.imagesService.uploadPhoto(avatar, 'profiles', user, null);
      if (storedPhoto) {
        params.avatar = storedPhoto.path;
      }
    } else if (avatar === null) {
      if (user.avatar) {
        this.imagesService.removePhoto(user.avatar, 'profiles', user, null);
      }
      params.avatar = null;
    } else {
      delete params.avatar;
    }
    const userToUpdate = await this.usersRepository.findOne({ id: user.id });
    const data = await this.usersRepository.save({ ...userToUpdate, ...params, id: user.id });
    return plainToClass(UsersDTO, data);
  }

  async updateMyPassword(params: UpdateMyPasswordDto, user: UsersEntity) {
    const oldHashedPassword = bcrypt.hashSync(params.old_password, user.salt);
    console.log('oldHashedPassword', oldHashedPassword);
    console.log('user', user.password);
    const isValid = await bcrypt.compare(params.old_password, user.password);
    console.log('myUser.password', user.password);
    console.log('isValid', isValid);
    if (!isValid) {
      throw new UnauthorizedException('Old password is incorrect');
    }
    user.password = bcrypt.hashSync(params.password, user.salt);
    return await this.usersRepository.save(user);
  }

  async update(params: UpdateUserDto, connectedUser) {

    const user = await this.getUserByIdAndBusinessId(params.id, params.business_id, connectedUser);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    delete params.business_id;

    if (await this.rolesService.hasRoles(connectedUser, ['admin', 'super'])) {
      const check = await this.businessesService.userHasBusiness(user, params.business_id);

      if (!check) {
        await this.businessesService.attachUserToBusiness(user, params.business_id);
      }

      if(params.password?.length>0) {
        params.password = bcrypt.hashSync(params.password, user.salt);
      }

      const data = await this.usersRepository.save({ ...user, ...params, id: user.id });

      if(params.roleId && data.roleId !== params.roleId) {
        return await this.rolesService.assignRoleToUser(data.id, params.roleId);
      } else {
        return data;
      }

    }
    return null;
  }

  async getOne(params: GetUserDto, connectedUser) {
    if(!params.hasOwnProperty('business_id') || !params.business_id) {
      return connectedUser;
    }
    const user = await this.getUserByIdAndBusinessId(params.id, params.business_id, connectedUser);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async delete(params: DeleteUserDto, connectedUser) {
    const user = await this.getUserByIdAndBusinessId(params.id, params.business_id, connectedUser);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (await this.rolesService.hasRoles(connectedUser, ['admin', 'super'])) {
      return await this.usersRepository.delete({ id: user.id });
    }
    return null;
  }

  async block(params: BlockUserDto, connectedUser) {
    const user = await this.getUserByIdAndBusinessId(params.id, params.business_id, connectedUser);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (await this.rolesService.hasRoles(connectedUser, ['admin', 'super'])) {
      user.isActive = 0;
      return await this.usersRepository.softDelete(user);
    }
    return null;
  }

  async unblock(params: BlockUserDto, connectedUser) {
    const user = await this.getUserByIdAndBusinessId(params.id, params.business_id, connectedUser);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (await this.rolesService.hasRoles(connectedUser, ['admin', 'super'])) {
      user.isActive = 1;
      return await this.usersRepository.softDelete(user);
    }
    return null;
  }

  private async getUserByIdAndBusinessId(userId, businessId, connectedUser) {
    const businesses = await this.businessesService.getAllUserBusinesses(connectedUser);
    const qb = this.usersRepository.createQueryBuilder('users');
    qb.leftJoin('users.businesses', 'business');
    qb.where('users.id = :userId', { userId });
    qb.andWhere('business.id IN (:...businessIds)', { businessIds: businesses.map((item) => item.id) });
    return await qb.getOne();
  }

}

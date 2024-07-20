import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, In, Repository } from 'typeorm';
import { Businesses } from '../entities/businesses.entity';
import { UsersEntity } from '../../users/entities/users.entity';
import { Injectable, NotFoundException, UploadedFile } from '@nestjs/common';
import { GetOneBusinessDto } from '../dto/getOneBusiness.dto';
import { AddBusinessDto } from '../dto/addBusiness.dto';
import { EditBusinessDto } from '../dto/editBusiness.dto';
import { DeleteBusinessDto } from '../dto/deleteBusiness.dto';
import { GetAllBusinessDto } from '../dto/getAllBusiness.dto';
import { ImagesService } from '../../images/services/images.service';
import { GetOneBusinessAsGuestDto } from '../dto/getOneBusinessAsGuest.dto';
import { query } from 'express';
import { SlugifyPipe } from '../../helpers/pipes/slugify.pipe';
import { SettingsService } from '../../settings/services/settings.service';

@Injectable()
export class BusinessesService {
  constructor(
    @InjectRepository(Businesses) private readonly businessRepository: Repository<Businesses>,
    @InjectRepository(UsersEntity) private readonly usersRepository: Repository<UsersEntity>,
    private imageService: ImagesService,
    private settingsService: SettingsService,
  ) {}

  async getAllUserBusinesses(user: UsersEntity) {
    const userIds = [user.id];
    // Allow users with the role "super" to get all businesses
    if (Number(user?.roleId) === 1) {
      return await this.businessRepository.find();
    }

    return await this.businessRepository
      .createQueryBuilder('business')
      .leftJoin('business.users', 'user')
      .where('user.id IN (:...userIds)', { userIds })
      .getMany();
    // return await this.businessRepository.find({ where: { user_id: user.id }});
  }

  async userHasBusiness(user: UsersEntity, businessId: number) {
    const userId = user.id;
    return await this.businessRepository
      .createQueryBuilder('business')
      .leftJoin('business.users', 'user')
      .where('user.id = :userId', { userId })
      .where('business.id = :businessId', { businessId })
      .getMany();
    // return await this.businessRepository.find({ where: { user_id: user.id }});
  }

  async getAll(params: GetAllBusinessDto, user: UsersEntity) {
    const userIds = [user.id];
    const query = this.businessRepository
      .createQueryBuilder('business')
      .leftJoin('business.users', 'user')
      .leftJoinAndSelect('business.parameter', 'parameter')
      .leftJoinAndSelect('business.location', 'location');

    if (Number(user?.roleId) !== 1) {
      query.where('user.id IN (:...userIds)', { userIds });
    }
    if (params?.all){
      return await query.getMany();
    }
    const total = await query.getCount();
    const page = params?.page || 1;
    const pageSize = params?.pageSize || 10;
    query.skip((page - 1) * pageSize).take(pageSize);
    query.take(pageSize);
    const data = await query.getMany();
    return {
      data,
      page,
      pageSize,
      total,
    };
  }

  async getOne(params: GetOneBusinessDto) {
    const business = await this.businessRepository
      .createQueryBuilder('business')
      .leftJoinAndSelect('business.parameter', 'parameter')
      .where('business.id=:id', { id: +params.id })
      .getOne();

    if (business && !business?.parameter) {
      business.parameter = await this.settingsService.getOne({ business_id: business.id });
    }
    return business;
    // return await this.businessRepository.findOne({ where: { id: +params.id } });
  }

  async getBusinessById(id) {
    return await this.businessRepository.findOne({ id });
  }

  async getOneAsGuest(params: GetOneBusinessAsGuestDto) {
    const query = await this.businessRepository
      .createQueryBuilder('business')
      .leftJoinAndSelect('business.parameter', 'parameter')
      .where('business.name=:name', { name: params.business_name });

    if (params.with_categories) {
      query.leftJoinAndSelect('business.categories', 'categories');
    }

    if (params.with_bg_categories) {
      query.leftJoinAndSelect('business.bg_categories', 'bg_categories');
    }
    const business = await query.getOne();
    if (business && !business?.parameter) {
      business.parameter = await this.settingsService.getOne({ business_id: business.id });
    }
    return business;
  }

  async store(params: AddBusinessDto, user: UsersEntity) {
    // attach user to the business
    const logo = params.logo;
    delete params.logo;
    const slugifyPipe = new SlugifyPipe();
    const slug = slugifyPipe.transform(params.name) + '_' + new Date().getTime();
    if( !params.location_id ){
      params.location_id = 240; // united states
    }
    if(!params.email){
      params.email = user.email;
    }
    const newbusiness = await this.businessRepository.save({ ...params, slug });
    if (newbusiness) {
      const connection = getConnection();
      const query: any = await connection
        .createQueryBuilder()
        .insert()
        .into('business_user')
        .values({ user_id: user.id, business_id: newbusiness.id })
        .printSql()
        .execute();
      if (params.logo && params.logo instanceof Object) {
        params.logo = (await this.imageService.uploadPhoto(logo, 'images/' + newbusiness.slug + '/logos', user, newbusiness))?.path;
      }
      return newbusiness;
    }
    return null;
  }

  async attachUserToBusiness(user: UsersEntity, business_id) {
    const connection = getConnection();
    const query: any = await connection
      .createQueryBuilder()
      .insert()
      .into('business_user')
      .values({ user_id: user.id, business_id })
      .printSql()
      .execute();
    return query;
  }

  async edit(params: EditBusinessDto, user) {
    const business = await this.businessRepository.findOne({ where: { id: +params.id } });
    if (!business) throw new NotFoundException('Business not found');
    if(params.hasOwnProperty('action_block')) {
      if(params.action_block === 'disable') {
        business.blocked_at = new Date();
      } else {
        business.blocked_at = null;
      }
      return await this.businessRepository.update({ id: business.id }, { blocked_at: business.blocked_at });
    }
    if (params.logo instanceof Object) {
      if (business.logo) {
        await this.imageService.removePhoto(business.logo, 'images/' + business.slug + '/logos', user, business);
      }
      params.logo = (await this.imageService.uploadPhoto(params.logo, 'images/' + business.slug + '/logos', user, business))?.path;
    } else if (params.logo === null) {
      if (business.logo) {
        await this.imageService.removePhoto(business.logo, 'images/' + business.slug + '/logos', user, business);
      }
    } else {
      delete params.logo;
    }
    return await this.businessRepository.save({ ...business, ...params });
  }

  async deleteOne(params: DeleteBusinessDto) {
    const business = await this.businessRepository.findOne({ where: { id: params.id, slug: params.slug } });
    if (!business) throw new NotFoundException('Business not found');
    return await this.businessRepository.softDelete({ id: business.id });
  }

  async getAdmins(businessId: number) {
    return await this.usersRepository
      .createQueryBuilder('users')
      .leftJoin('users.businesses', 'business')
      .leftJoinAndSelect('users.role', 'role')
      .where('business.id = :id', { id: businessId })
      .andWhere('role.name In (:...roles)', { roles: ['admin', 'manager'] })
      .getMany();
  }

  async findOneByEmail(param: { email: string }) {
    return await this.businessRepository.findOne({ where: { email: param.email, deleted_at: null } });
  }
}

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import {In, IsNull, Not, Repository} from 'typeorm';
import { BackgroundsEntity } from '../entities/backgrounds.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GetOneBgDto } from '../dto/getOneBg.dto';
import { AddBgDto } from '../dto/addBg.dto';
import { EditBgDto } from '../dto/editBg.dto';
import { DeleteBgDto } from '../dto/deleteBg.dto';
import {GetAllBgDto} from "../dto/getAllBg.dto";
import {ChangeOrderBGDto} from "../dto/changeOrderBG.dto";
import {ImagesService} from "../../images/services/images.service";
import {SizesEntity} from "../entities/sizes.entity";
import {BgCategories} from "../../bgcategories/entities/bgcategories.entity";
import {BgCategoriesService} from "../../bgcategories/services/bgcategories.service";

@Injectable()
export class BackgroundsService {
  constructor(
            @InjectRepository(BackgroundsEntity) private backgroundRepository: Repository<BackgroundsEntity>,
            @InjectRepository(SizesEntity) private sizesRepository: Repository<SizesEntity>,
              private  bgCategoriesService: BgCategoriesService,
              private imagesService: ImagesService,
              ) {}

  async getAll(params: GetAllBgDto) {
    let categories = [];
    if (params.category_id) {
      const category = await this.bgCategoriesService.getOne({ business_id: +params.business_id, id: +params.category_id });
      if (!category) throw new NotFoundException('Category not found');
      // return await this.productRepository.find({ where: { category_id: +params.category_id } });
      categories = [category];
    } else {
      // get all products having categories belongs to business_id
      categories = await this.bgCategoriesService.getAll({ business_id: params.business_id });
      if (!(categories?.length > 0)) {
        categories = [];
      }
    }


    const pageSize = params?.pageSize || 10;
    const page = params?.page || 1;
    const total = await this.backgroundRepository.count({
      where: {
        category_id: In(categories.map((item) => item.id)),
      },
    });
    const data = await this.backgroundRepository.find({
      relations: ['rule', 'sizes'],
      where: {
        category_id: In(categories.map((item) => item.id)),
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
      order: {
        order: 'ASC',
        id: 'DESC',
      },
    });
    return {
      data,
      page,
      pageSize,
      total
    }
  }

  async getOne(params: GetOneBgDto) {
    return await this.backgroundRepository.findOne({
      where: { id: +params.id, business_id: params.business_id },
      relations: ['rule', 'sizes'],
    });
  }

  async store(params: AddBgDto, business, user) {
    if (params.category_id) {
      const category = await this.bgCategoriesService.getOne({ business_id: +params.business_id, id: +params.category_id });
      if (!category) {
        throw new NotFoundException('Category not found');
        return;
      }
    }

    const data = [];
    // copy by value
    const sizes = params.sizes && Array.isArray(params.sizes) && params.sizes?.length > 0 ? [...params.sizes] : null;
    delete params.sizes;
    let i = 0;
    for (const item of params.photos) {
      const photo = await this.imagesService.uploadPhoto(item, 'images/' + business.slug + '/backgrounds', user, business);

      const newbg = await this.backgroundRepository.save({
        ...params,
        photo: photo?.path,
        photo_thumb: photo?.thumbnail,
        storage_size: photo?.storage_size,
        dominating_color: photo?.dominating_color,
      });
      i++;
      if (sizes) {
        sizes?.forEach((item) => {
          item.background_id = newbg.id;
          delete item.id;
        });
        await this.sizesRepository.save(sizes);
      }


      data.push(newbg);
    }

    // Save diemnsions
    // if (params.sizes && Array.isArray(params.sizes) && params.sizes?.length > 0 && data?.length > 0) {
    //   params.sizes?.forEach((item) => {
    //     item.background_id = data[0].id;
    //   });
    //   await this.sizesRepository.save(params.sizes);
    // } else{
    //   delete params.sizes;
    // }

    return data?.length > 1 ? data : ( data?.length === 1 ? data[0] : null);
  }

  async edit(params: EditBgDto) {
    const bg = await this.backgroundRepository.findOne({ id: params.id, business_id: params.business_id });
    if (!bg) throw new NotFoundException('Background not found');
    if (params.hasOwnProperty('sizes')) {
      await this.sizesRepository.delete({ background_id: bg.id });
      if (params.sizes && Array.isArray(params.sizes) && params.sizes?.length > 0) {
        params.sizes.forEach((item) => {
          item.background_id = bg.id;
        });
        await this.sizesRepository.save(params.sizes);
      }
    }
    delete params.sizes;
    return await this.backgroundRepository.update({ id: bg.id }, { ...bg, ...params });
  }

  async deleteOne(params: DeleteBgDto, business, user) {
    const bg = await this.backgroundRepository.findOne({ where: { id: +params.id, business_id: +params.business_id } });
    if (!bg) throw new NotFoundException('Background not found');
    try {
      if(bg.photo){
        await this.imagesService.removePhoto(bg.photo, 'images/' + business?.slug + '/backgrounds', user, business);
      }
      if(bg.photo_thumb){
        await this.imagesService.removePhoto(bg.photo_thumb, 'images/' + business?.slug + '/backgrounds', user, business);
      }
    } catch (e) {
      throw new BadRequestException('Can not delete background');
    }
    return await this.backgroundRepository.delete({ id: bg.id });
  }

  async changeOrder(params: ChangeOrderBGDto) {
    // return params;

    for (const item of params.orders) {
      const bg = await this.backgroundRepository.findOne({ id: + item.id, business_id: +params.business_id});

      // console.log('find', product.id);
      if (bg) {
        bg.order = +item.order;
        await this.backgroundRepository.save(bg);
      }
    }
    const notnullcount = await this.backgroundRepository.count({
      where: {
        order: Not(IsNull()),
      },
    });
    const nullValues = await this.backgroundRepository.find({
      where: {
        order: IsNull(),
      },
    });
    for (let i = 0; i < nullValues?.length; i++) {
      nullValues[i].order = notnullcount + i + 1;
      await this.backgroundRepository.save(nullValues[i]);
    }
    return true;
  }


  public async getBgByIdAndByBusinessId(id: number, businessId: number) {
    return await this.backgroundRepository
      .createQueryBuilder('backgrounds')
      .where('backgrounds.business_id = :businessId', { businessId })
      .andWhere('backgrounds.id = :bgId', { bgId: id })
      .getOne();
  }
}

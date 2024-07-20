import { InjectRepository } from '@nestjs/typeorm';
import { Products } from '../../products/entities/products.entity';
import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { DeleteCategoryDto } from '../dto/deleteCategory.dto';
import { EditCategoryDto } from '../dto/editCategory.dto';
import { AddCategoryDto } from '../dto/addCategory.dto';
import { GetOneCategoryDto } from '../dto/getOneCategory.dto';
import { BgCategories } from '../entities/bgcategories.entity';
import { ImagesService } from '../../images/services/images.service';
import { BackgroundsEntity } from '../../backgrounds/entities/backgrounds.entity';

@Injectable()
export class BgCategoriesService {
  constructor(
    @InjectRepository(BgCategories) private categoryRepository: Repository<BgCategories>,
    @InjectRepository(BackgroundsEntity) private backgroundRepository: Repository<BackgroundsEntity>,
    private imagesService: ImagesService,
  ) {}

  async getAll(params: { business_id: () => number }) {
    const queryBuilder = this.categoryRepository.createQueryBuilder('category');
    queryBuilder.leftJoin('category.backgrounds', 'backgrounds');
    queryBuilder.select(['category.*', 'COUNT(backgrounds.id) AS bgs_count']);
    queryBuilder.groupBy('category.id');
    queryBuilder.where('category.business_id = :business_id', { business_id: params.business_id });
    return await queryBuilder.getRawMany();
  }

  async getOne(params: GetOneCategoryDto) {
    return await this.categoryRepository.findOne({ where: { id: +params.id, business_id: params.business_id } });
  }

  async store(params: AddCategoryDto, business, user) {
    if (params.photo) {
      const photo = await this.imagesService.uploadPhoto(params.photo, 'images/' + business.slug + '/backgrounds', user, business);
      return await this.categoryRepository.save({ ...params, photo: photo.path, photo_thumb: photo?.thumbnail });
    }

    return await this.categoryRepository.save(params);
  }

  async edit(params: EditCategoryDto, business, user) {
    const category = await this.categoryRepository.findOne({ where: { id: +params.id } });
    if (!category) throw new NotFoundException('Category not found');

    if (params.hasOwnProperty('photo') && params.photo === null) {
      const photo = await this.imagesService.removePhoto(category.photo, 'images/' + business.slug + '/backgrounds', user, business);
      return await this.categoryRepository.save({ ...category, ...params, photo: null, photo_thumb: null });
    }

    if (params.photo) {
      await this.imagesService.removePhoto(category.photo, 'images/' + business.slug + '/backgrounds', user, business);
      const photo = await this.imagesService.uploadPhoto(params.photo, 'images/' + business.slug + '/backgrounds', user, business);
      return await this.categoryRepository.save({ ...category, ...params, photo: photo.path, photo_thumb: photo?.thumbnail });
    }

    return await this.categoryRepository.save({ ...category, ...params });
  }

  async deleteOne(params: DeleteCategoryDto, business, user) {
    const category = await this.categoryRepository.findOne({ where: { id: params.id } });
    if (!category) throw new NotFoundException('Category not found');
    await this.imagesService.removePhoto(category.photo, 'images/' + business.slug + '/backgrounds', user, business);

    const backgrounds = await this.backgroundRepository.find({ where: { category_id: category.id } });
    for (const bg of backgrounds) {
      if (bg.photo) {
        await this.imagesService.removePhoto(bg.photo, 'images/' + business?.slug + '/backgrounds', user, business);
      }
      if (bg.photo_thumb) {
        await this.imagesService.removePhoto(bg.photo_thumb, 'images/' + business?.slug + '/backgrounds', user, business);
      }
      await this.backgroundRepository.delete({ id: bg.id });
    }
    return await this.categoryRepository.softDelete({ id: category.id });
  }
}

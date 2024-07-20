import { Products } from '../entities/products.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {In, IsNull, Not, Repository} from 'typeorm';
import { GetOneProductDto } from '../dto/getOneProduct.dto';
import { AddProductDto } from '../dto/addProduct.dto';
import { EditProductDto } from '../dto/editProduct.dto';
import { NotFoundException } from '@nestjs/common';
import { DeleteProductDto } from '../dto/deleteProduct.dto';
import { CategoriesService } from '../../categories/services/categories.service';
import { GetAllProductDto } from '../dto/getAllProduct.dto';
import {ChangeOrderProductDto} from "../dto/changeOrderProduct.dto";
import {ImagesService} from "../../images/services/images.service";
import {UsersEntity} from "../../users/entities/users.entity";
import {Dimensions} from "../entities/dimensions.entity";


export class ProductsService {
  constructor(
    @InjectRepository(Products) private productRepository: Repository<Products>,
    @InjectRepository(Dimensions) private dimensionsRepository: Repository<Dimensions>,
    private categoriesService: CategoriesService,
    private imagesService: ImagesService,
    ) {}

  async getAll(params: GetAllProductDto) {
    let categories = [];
    if (params.category_id) {
      const category = await this.categoriesService.getOne({ business_id: +params.business_id, id: +params.category_id });
      if (!category) throw new NotFoundException('Category not found');
      // return await this.productRepository.find({ where: { category_id: +params.category_id } });
      categories = [category];
    } else {
      // get all products having categories belongs to business_id
      categories = await this.categoriesService.getAll({ business_id: params.business_id });
      if (!(categories?.length > 0)) {
        categories = [];
      }
    }

    const total = await this.productRepository.count({
      where: {
        category_id: In(categories.map((item) => item.id)),
      },
    });
    const pageSize = params?.pageSize || 10;
    const page = params?.page || 1;
    const data = await this.productRepository.find({
      relations: ['category', 'dimensions'],
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

  async getOne(params: GetOneProductDto) {
    const query = this.productRepository
      .createQueryBuilder('products')
      .select()
      .leftJoinAndSelect('products.category', 'category')
      .leftJoinAndSelect('products.dimensions', 'dimensions')
      .where('category.business_id = :businessId', { businessId: params.business_id })
      .andWhere('products.id = :productId', { productId: params.id })
      .select([
        'products.name',
        'products.price',
        'products.description',
        'products.id',
        'products.category_id',
        'products.photo',
        'products.dominating_color',
        'products.nbr_clicks',
        'products.nbr_views',
        'products.nbr_submits',
        'products.link',
        'products.link',

        'dimensions.id',
        'dimensions.width',
        'dimensions.height',
        'dimensions.price',

        'category.name',
        'category.id',
        'category.business_id',
      ]);
    const data = await query.getOne();
    if (data) {
      return data;
    } else {
      throw new NotFoundException('Product not found');
    }
  }

  async store(params: AddProductDto, business, user: UsersEntity) {
    if (params.category_id) {
      const category = await this.categoriesService.getOne({ business_id: +params.business_id, id: +params.category_id });
      if (!category) {
        throw new NotFoundException('Category not found');
        return;
      }
    }

    // Save diemnsions
    if (params.dimensions && Array.isArray(params.dimensions) && params.dimensions?.length > 0) {
      await this.dimensionsRepository.save(params.dimensions);
    } else{
      delete params.dimensions;
    }

    const data = [];
    for (const item of params.photos) {
      const photo = await this.imagesService.uploadPhoto(item, 'images/' + business.slug + '/products', user, business);

      data.push (
        await this.productRepository.save({
          ...params,
          business_id: params.business_id,
          photo: photo?.path,
          photo_thumb: photo?.thumbnail,
          storage_size: photo?.storage_size,
          dominating_color: photo?.dominating_color,
        }),
      );
    }

    // const photo = await this.imagesService.uploadPhoto(
    //   params.photo,
    //   'images/' + business.slug + '/products',
    //   user,
    //   business,
    // );
    //
    // params.photo = photo?.path;
    // params.photo_thumb = photo?.thumbnail;
    // return await this.productRepository.save(params);
    return data?.length > 1 ? data : ( data?.length === 1 ? data[0] : null);

  }

  async edit(params: EditProductDto) {
    if (params.category_id) {
      const category = await this.categoriesService.getOne({ business_id: +params.business_id, id: +params.category_id });
      if (!category) {
        throw new NotFoundException('Category not found');
        return;
      }
    }

    const product = await this.getProductByIdAndByBusinessId(params.id, params.business_id);

    if (!product) throw new NotFoundException('Product not found');

    if (params.hasOwnProperty('dimensions')) {
      await this.dimensionsRepository.delete({ product_id: product.id });
      if(params.dimensions && Array.isArray(params.dimensions) && params.dimensions?.length > 0){
        params.dimensions.forEach((item) => {
          item.product_id = product.id;
        });
        await this.dimensionsRepository.save(params.dimensions);
      }
    }
    delete params.dimensions;
    return await this.productRepository.save({ ...product, ...params });
  }

  async deleteOne(params: DeleteProductDto, business, user) {
    const product = await this.getProductByIdAndByBusinessId(params.id, params.business_id);

    if (!product) throw new NotFoundException('Product not found');

    try{
      if(product.photo){
        await this.imagesService.removePhoto(product.photo, 'images/' + business?.slug + '/products', user, business);
      }
      if(product.photo_thumb){
        await this.imagesService.removePhoto(product.photo_thumb, 'images/' + business?.slug + '/products', user, business);
      }
    }catch (e){
      console.log('error deleting product file', e);
    }

    return await this.productRepository.delete({ id: product.id });
  }

  public async getProductByIdAndByBusinessId(id: number, businessId: number) {
    return await this.productRepository
      .createQueryBuilder('products')
      .leftJoin('products.category', 'category')
      .leftJoin('products.dimensions', 'dimensions')
      .where('category.business_id = :businessId', { businessId })
      .andWhere('products.id = :productId', { productId: id })
      .getOne();
  }

  async changeOrder(params: ChangeOrderProductDto) {
    for (const item of params.orders) {
      const product = await this.getProductByIdAndByBusinessId(+item.id, +params.business_id);
      // console.log('find', product.id);
      if(product){
        product.order = +item.order;
        await this.productRepository.save(product);
      }
    }
    const notnullcount = await this.productRepository.count({
      where: {
        order: Not(IsNull()),
      },
    });
    const nullValues = await this.productRepository.find({
      where: {
        order: IsNull(),
      },
    });
    for (let i = 0; i < nullValues?.length; i++) {
      nullValues[i].order = notnullcount + i + 1;
      await this.productRepository.save(nullValues[i]);
    }
    return true;
  }
}

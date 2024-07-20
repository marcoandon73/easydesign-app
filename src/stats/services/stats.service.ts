import { GetStatsDto } from '../dto/getStats.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Stats } from '../entities/stats.entity';
import { Products } from '../../products/entities/products.entity';
import { DateToDateTimePipe } from '../../helpers/pipes/date-to-date-time.pipe';
import { Orders } from '../../orders/entities/orders.entity';
import { BackgroundsEntity } from '../../backgrounds/entities/backgrounds.entity';
import {StorageConsumptionEntity} from "../../storage-consumption/entites/storage-consumption.entity";
import {StorageActionsEntity} from "../../storage-consumption/entites/storage-actions.entity";

export class StatsService {
  constructor(
    @InjectRepository(Stats) private readonly statsRepository: Repository<Stats>,
    @InjectRepository(Products) private readonly productRepository: Repository<Products>,
    @InjectRepository(BackgroundsEntity) private readonly backgroundsEntity: Repository<BackgroundsEntity>,
    @InjectRepository(Orders) private readonly ordersRepository: Repository<Orders>,
    @InjectRepository(StorageConsumptionEntity) private readonly storageConsumptionRepository: Repository<StorageConsumptionEntity>,
    @InjectRepository(StorageActionsEntity) private readonly storageActionsRepository: Repository<StorageActionsEntity>,
  ) {}

  async getStatsSubmits(params: GetStatsDto) {
    // get each product's total submits from orders
    const query = this.productRepository
      .createQueryBuilder('product')
      .leftJoin('product.order_products', 'order_products')
      .leftJoin('order_products.order', 'orders')

      .select([
        'product.name as name',
        'product.id as id',
        'product.dominating_color as dominating_color',
        'product.photo_thumb as photo_thumb',
      ])
      .addSelect('COUNT(DISTINCT(orders.id))', 'value')
      .orderBy('value', 'DESC')
      .limit(10)
      .where('product.business_id = :business_id', { business_id: params.business_id })
      .where('orders.business_id = :business_id', { business_id: params.business_id })
      .andWhere('orders.deleted_at IS NULL');

    params.starts_at = new DateToDateTimePipe().transform(params.starts_at);
    params.ends_at = new DateToDateTimePipe().transform(params.ends_at);

    if (params.starts_at) {
      query.andWhere('orders.created_at >= :starts_at', { starts_at: params.starts_at });
    }
    if (params.ends_at) {
      query.andWhere('orders.created_at <= :ends_at', { ends_at: params.ends_at });
    }
    query.groupBy('name, id');

    return await query.getRawMany();
  }

  async getStatsSubmitsBgs(params: GetStatsDto) {
    // get each product's total submits from orders
    const query = this.backgroundsEntity
      .createQueryBuilder('bg')
      .innerJoin('bg.order_products', 'order_products')
      .innerJoin('order_products.order', 'orders')

      .select(['bg.name as name', 'bg.id as id', 'bg.dominating_color as dominating_color', 'bg.photo_thumb as photo_thumb'])
      .addSelect('COUNT(DISTINCT(orders.id))', 'value')
      .orderBy('value', 'DESC')
      .limit(10)
      .where('bg.business_id = :business_id', { business_id: params.business_id })
      .where('orders.business_id = :business_id', { business_id: params.business_id })
      .andWhere('orders.deleted_at IS NULL')
      .printSql();

    params.starts_at = new DateToDateTimePipe().transform(params.starts_at);
    params.ends_at = new DateToDateTimePipe().transform(params.ends_at);

    if (params.starts_at) {
      query.andWhere('orders.created_at >= :starts_at', { starts_at: params.starts_at });
    }
    if (params.ends_at) {
      query.andWhere('orders.created_at <= :ends_at', { ends_at: params.ends_at });
    }
    query.groupBy('name, id');

    console.log('query', query.getSql());
    return await query.getRawMany();
  }

  async getStatsCanals(params: GetStatsDto) {
    const query = this.ordersRepository
      .createQueryBuilder('orders')
      .leftJoin('orders.order_products', 'order_products')
      .select(['orders.order_type as name'])
      .addSelect('COUNT(DISTINCT(orders.id))', 'value')
      // .where('orders.order_type NOT NULL')
      .andWhere('orders.business_id = :business_id', { business_id: params.business_id })
      .andWhere('orders.deleted_at IS NULL');

    params.starts_at = new DateToDateTimePipe().transform(params.starts_at);
    params.ends_at = new DateToDateTimePipe().transform(params.ends_at);

    if (params.starts_at) {
      query.andWhere('orders.created_at >= :starts_at', { starts_at: params.starts_at });
    }
    if (params.ends_at) {
      query.andWhere('orders.created_at <= :ends_at', { ends_at: params.ends_at });
    }
    query.groupBy('order_type');
    return await query.getRawMany();
  }

  async getStatsStorageConsumption(params: GetStatsDto) {
    const qb = this.storageConsumptionRepository
      .createQueryBuilder('storage_consumption')
      .where('storage_consumption.business_id = :business_id', { business_id: params.business_id })
      .orderBy('storage_consumption.created_at', 'DESC');
    return await qb.getMany();

  }

  async getStorageActionsHistory(params: GetStatsDto) {
    const qb = this.storageActionsRepository
      .createQueryBuilder('storage_actions')
      .where('storage_actions.business_id = :business_id', { business_id: params.business_id })
      .orderBy('storage_actions.created_at', 'DESC');


    params.starts_at = new DateToDateTimePipe().transform(params.starts_at);
    params.ends_at = new DateToDateTimePipe().transform(params.ends_at);

    if(params.starts_at) {
      qb.andWhere('storage_actions.created_at >= :starts_at', { starts_at: params.starts_at });
    }

    if(params.ends_at) {
      qb.andWhere('storage_actions.created_at <= :ends_at', { ends_at: params.ends_at });
    }

    return await qb.getMany();
  }
}

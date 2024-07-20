import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ratings } from '../entities/ratings.entity';
import { Repository } from 'typeorm';
import { AddRatingDto } from '../dto/addRating.dto';
import { GetAllRatingDto } from '../dto/getAllRating.dto';

@Injectable()
export class RatingService {
  constructor(@InjectRepository(Ratings) private ratingRepository: Repository<Ratings>) {}

  async getALl(params: GetAllRatingDto) {
    const query = this.ratingRepository.createQueryBuilder('ratings');
    query.where('ratings.business_id=:businessId', { businessId: params.business_id });
    query.leftJoinAndSelect('ratings.user', 'user');
    // query.addSelect('ratings.stars', 'stars');
    query.andWhere('ratings.deleted_at IS NULL');
    query.orderBy('ratings.created_at', 'DESC');
    const total = await query.getCount();
    const pageSize = params?.pageSize || 10;
    const page = params?.page || 1;
    query.take(pageSize);
    query.skip((page - 1) * pageSize);
    const data = await query.getMany();
    // data.forEach((rating) => {
    //   console.log(rating.stars);
    // });
    return {
      data,
      page,
      pageSize,
      total,
    };
  }

  async create(params: AddRatingDto) {
    const rating = this.ratingRepository.create({
      business_id: params.business_id,
      user_id: params.user_id || null,
      message: params.message || null,
      ratingPercent: params.rating_percent || null,
    });
    return await this.ratingRepository.save(rating);
  }
}

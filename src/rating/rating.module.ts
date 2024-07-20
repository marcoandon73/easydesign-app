import { Module } from '@nestjs/common';
import { RatingController } from './rating.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ratings } from './entities/ratings.entity';
import { RatingService } from './services/rating.service';
import { HelpersModule } from '../helpers/helpers.module';
import { BusinessesModule } from '../businesses/businesses.module';
import {PassportModule} from "@nestjs/passport";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', property: 'user', session: false }),
    TypeOrmModule.forFeature([Ratings]), HelpersModule, BusinessesModule],
  controllers: [RatingController],
  providers: [RatingService],
})
export class RatingModule {}

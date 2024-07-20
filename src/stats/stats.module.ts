import { Module } from '@nestjs/common';
import { StatsController } from './stats.controller';
import { StatsService } from './services/stats.service';
import { PassportModule } from '@nestjs/passport';
import { HelpersModule } from '../helpers/helpers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Businesses } from '../businesses/entities/businesses.entity';
import { Stats } from './entities/stats.entity';
import { BusinessesModule } from '../businesses/businesses.module';
import { Products } from '../products/entities/products.entity';
import { Orders } from '../orders/entities/orders.entity';
import { BackgroundsEntity } from '../backgrounds/entities/backgrounds.entity';
import { StorageConsumptionEntity } from '../storage-consumption/entites/storage-consumption.entity';
import { StorageActionsEntity } from '../storage-consumption/entites/storage-actions.entity';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', property: 'user', session: false }),
    HelpersModule,
    TypeOrmModule.forFeature([Businesses, Stats, Products, Orders, BackgroundsEntity, StorageConsumptionEntity, StorageActionsEntity]),
    BusinessesModule,
  ],
  controllers: [StatsController],
  providers: [StatsService],
})
export class StatsModule {}

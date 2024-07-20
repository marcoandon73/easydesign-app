import { Module } from '@nestjs/common';
import { BgCategoriesController } from './bgcategories.controller';
import { BgCategoriesService } from './services/bgcategories.service';
import { BusinessesModule } from '../businesses/businesses.module';
import { HelpersModule } from '../helpers/helpers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BgCategories} from './entities/bgcategories.entity';
import { PassportModule } from '@nestjs/passport';
import { ImagesModule } from '../images/images.module';
import { BackgroundsEntity } from '../backgrounds/entities/backgrounds.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BgCategories, BackgroundsEntity]),
    PassportModule.register({ defaultStrategy: 'jwt', property: 'user', session: false }),
    BusinessesModule,
    HelpersModule,
    ImagesModule,
  ],
  controllers: [BgCategoriesController],
  providers: [BgCategoriesService],
  exports: [BgCategoriesService],
})
export class BgCategoriesModule {}

import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './services/categories.service';
import { BusinessesModule } from '../businesses/businesses.module';
import { HelpersModule } from '../helpers/helpers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categories } from './entities/categories.entity';
import {PassportModule} from "@nestjs/passport";
import {ImagesModule} from "../images/images.module";
import {Products} from "../products/entities/products.entity";


@Module({
  imports: [
    TypeOrmModule.forFeature([Categories, Products]),
    PassportModule.register({ defaultStrategy: 'jwt', property: 'user', session: false }),
    BusinessesModule,
    HelpersModule,
    ImagesModule
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [CategoriesService]
})
export class CategoriesModule {}

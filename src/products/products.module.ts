import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './services/products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from './entities/products.entity';
import { BusinessesModule } from '../businesses/businesses.module';
import { HelpersModule } from '../helpers/helpers.module';
import { PassportModule } from '@nestjs/passport';
import { CategoriesModule } from '../categories/categories.module';
import {ImagesModule} from "../images/images.module";
import {Dimensions} from "./entities/dimensions.entity";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', property: 'user', session: false }),
    TypeOrmModule.forFeature([Products, Dimensions]),
    BusinessesModule,
    HelpersModule,
    CategoriesModule,
    ImagesModule
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}

import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { BackgroundsController } from './backgrounds.controller';
import { BackgroundsService } from './services/backgrounds.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BackgroundsEntity } from './entities/backgrounds.entity';
import { FormatResponse } from '../helpers/auth-format-response';
import { BusinessAccessMiddleware } from '../helpers/middlewares/businessAccess.middleware';
import { PassportModule } from '@nestjs/passport';
import { HelpersModule } from '../helpers/helpers.module';
import { BusinessesService } from '../businesses/services/businesses.service';
import {BusinessesModule} from "../businesses/businesses.module";
import {ImagesModule} from "../images/images.module";
import {SizesEntity} from "./entities/sizes.entity";
import {BgCategoriesModule} from "../bgcategories/bgcategories.module";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', property: 'user', session: false }),
    TypeOrmModule.forFeature([BackgroundsEntity, SizesEntity]),
    HelpersModule,
    BusinessesModule,
    ImagesModule,
    BgCategoriesModule
  ],
  controllers: [BackgroundsController],
  providers: [BackgroundsService, FormatResponse, BusinessAccessMiddleware],
  exports: [BackgroundsService],
})
export class BackgroundsModule {
  // configure(consumer: MiddlewareConsumer) {
  // consumer.apply(BusinessAccessMiddleware).forRoutes({ path: 'backgrounds*', method: RequestMethod.GET });
  // }
}

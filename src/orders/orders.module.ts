import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './services/orders.service';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from './entities/orders.entity';
import { BusinessesModule } from '../businesses/businesses.module';
import { HelpersModule } from '../helpers/helpers.module';
import { ProductsModule } from '../products/products.module';
import { OrderProduct } from './entities/orderProduct.entity';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { ImagesModule } from '../images/images.module';
import {SendEmailToCustomerService} from "./services/send-email-to-customer.service";
import {SendEmailToBuyerService} from "./services/send-email-to-buyer.service";
import {BackgroundsModule} from "../backgrounds/backgrounds.module";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', property: 'user', session: false }),
    TypeOrmModule.forFeature([Orders, OrderProduct]),
    BusinessesModule,
    HelpersModule,
    ProductsModule,
    BackgroundsModule,
    NestjsFormDataModule,
    ImagesModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService,
    SendEmailToCustomerService,
    SendEmailToBuyerService,
  ],
})
export class OrdersModule {}

import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { ImagesService } from './services/images.service';
import { HelpersModule } from '../helpers/helpers.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {StorageActionsEntity} from "../storage-consumption/entites/storage-actions.entity";

@Module({
  imports: [
    HelpersModule,
    TypeOrmModule.forFeature([StorageActionsEntity])
  ],
  controllers: [ImagesController],
  providers: [ImagesService],
  exports: [ImagesService],
})
export class ImagesModule {}

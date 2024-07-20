import { Module } from '@nestjs/common';
import { SettingsController } from './settings.controller';
import { SettingsService } from './services/settings.service';
import { PassportModule } from '@nestjs/passport';
import { HelpersModule } from '../helpers/helpers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Businesses } from '../businesses/entities/businesses.entity';
import { Parameters } from './entities/parameters.entity';
import {BusinessesModule} from "../businesses/businesses.module";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', property: 'user', session: false }),
    HelpersModule,
    TypeOrmModule.forFeature([Businesses, Parameters]),
    BusinessesModule
  ],
  controllers: [SettingsController],
  providers: [SettingsService],
  exports: [SettingsService],
})
export class SettingsModule {}

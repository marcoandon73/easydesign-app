import { Module } from '@nestjs/common';
import { BusinessesController } from './businesses.controller';
import { BusinessesService } from './services/businesses.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Businesses } from './entities/businesses.entity';
import {PassportModule} from "@nestjs/passport";
import {HelpersModule} from "../helpers/helpers.module";
import {IsUniqueEmail} from "./dto/unique-email.validator";
import {UsersEntity} from "../users/entities/users.entity";
import {ImagesModule} from "../images/images.module";
import {SettingsModule} from "../settings/settings.module";
import {SettingsService} from "../settings/services/settings.service";
import {Parameters} from "../settings/entities/parameters.entity";
// import {BusinessAccessValidator} from "./dto/business-access.validator";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', property: 'user', session: false }),
    HelpersModule,
    TypeOrmModule.forFeature([Businesses, UsersEntity, Parameters]),
    ImagesModule
  ],
  controllers: [BusinessesController],
  providers: [BusinessesService, IsUniqueEmail, SettingsService],
  exports: [BusinessesService],
})
export class BusinessesModule {}

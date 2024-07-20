import { Module } from '@nestjs/common';
import { LocationsController } from './locations.controller';
import { LocationsService } from './services/locations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Locations } from './entities/locations.entity';
import {HelpersModule} from "../helpers/helpers.module";
import {PassportModule} from "@nestjs/passport";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', property: 'user', session: false }),
    TypeOrmModule.forFeature([Locations]),
    HelpersModule
  ],
  controllers: [LocationsController],
  providers: [LocationsService],
})
export class LocationsModule {}

import { Module } from '@nestjs/common';
import { RulesController } from './rules.controller';
import { RulesService } from './services/rules.service';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BackgroundsEntity } from '../backgrounds/entities/backgrounds.entity';
import { HelpersModule } from '../helpers/helpers.module';
import { RulesEntity } from './entities/rules.entity';
import {BusinessesModule} from "../businesses/businesses.module";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', property: 'user', session: false }),
    TypeOrmModule.forFeature([BackgroundsEntity, RulesEntity]),
    HelpersModule,
    BusinessesModule
  ],
  controllers: [RulesController],
  providers: [RulesService],
})
export class RulesModule {}

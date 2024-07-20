import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './services/users.service';
import { UsersEntity } from './entities/users.entity';
import { Roles } from '../roles/entities/roles.entity';
import { Permissions } from '../roles/entities/permissions.entity';
import { UsersController } from './users.controller';
import { PassportModule } from '@nestjs/passport';
import { HelpersModule } from '../helpers/helpers.module';
import { ImagesModule } from '../images/images.module';
import { BusinessesModule } from '../businesses/businesses.module';
import { RolesService } from './services/roles.service';
import { RolesController } from './roles.controller';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', property: 'user', session: false }),
    TypeOrmModule.forFeature([UsersEntity, Roles, Permissions]),
    HelpersModule,
    BusinessesModule,
    ImagesModule,
  ],
  controllers: [UsersController, RolesController],
  providers: [UsersService, RolesService],
  exports: [UsersService, RolesService],
})
export class UsersModule {}

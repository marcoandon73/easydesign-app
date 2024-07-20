import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';

@Module({
  controllers: [RolesController],
  providers: [],
})
export class RolesModule {}

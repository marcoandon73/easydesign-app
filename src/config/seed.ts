import { Logger } from '@nestjs/common';
import { join } from 'path';
import {dbConfig} from "./database";
export const dbSeed = () => ({
  ...dbConfig(),
  //seeds: [join(__dirname, '../database/seeds/**/*{.ts,.js}')],
  seeds: [join(__dirname, '../database/seeds/DatabaseSeeder.seed.ts')],
  factories: [join(__dirname, '../database/factories/**/*{.ts,.js}')]
});

if (process.env.NODE_ENV === 'development') {
  Logger.debug(dbSeed());
}

export default dbSeed();

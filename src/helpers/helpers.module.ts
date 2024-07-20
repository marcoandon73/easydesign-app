import { Module } from '@nestjs/common';
import { FormatResponse } from './auth-format-response';
import { BusinessAccessMiddleware } from './middlewares/businessAccess.middleware';
import { ToLowerCasePipe } from './pipes/to-lower-case.pipe';
import { SlugifyPipe } from './pipes/slugify.pipe';
import {DateToDateTimePipe} from "./pipes/date-to-date-time.pipe";

@Module({
  providers: [
    FormatResponse,
    BusinessAccessMiddleware,
    DateToDateTimePipe,
    ToLowerCasePipe,
    SlugifyPipe
  ],
  exports: [
    FormatResponse, ToLowerCasePipe,
    DateToDateTimePipe,
    SlugifyPipe, BusinessAccessMiddleware],
})
export class HelpersModule {}

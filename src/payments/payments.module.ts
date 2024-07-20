import { Module } from '@nestjs/common';
import { PaymentsService } from './services/payments.service';

@Module({
  providers: [PaymentsService],
})
export class PaymentsModule {}

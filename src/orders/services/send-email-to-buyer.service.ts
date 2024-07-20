import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SendEmailToBuyerService {
  constructor(private mailerService: MailerService) {}

  async sendMail(email: string, business_name: string, customer_email: string, cc: Array<string>, order_id) {
    console.log('send email', email, business_name, customer_email, cc, order_id)
    await this.mailerService.sendMail({
      to: email,
      subject: 'New Order Received - [' + order_id + ']',
      template: 'email-order-to-buyer',
      cc,
      context: {
        business_name,
        customer_email,
        order_id
      },
    });
  }
}

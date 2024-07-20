import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SendEmailToCustomerService {
  constructor(private mailerService: MailerService) {}

  async sendMail(email: string, business_name: string, customer_name: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: '[' + business_name + ']Thank you for your interest in our product',
      template: 'email-order-to-customer',
      context: {
        business_name,
        customer_name
      },
    });
  }
}

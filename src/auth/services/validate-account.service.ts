import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ValidateAccountService {
  constructor(private mailerService: MailerService) {}

  async sendMail(email: string, name: string, link: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Validate your account',
      template: 'validate-account',
      context: {
        name,
        link
      },
    });
  }
}

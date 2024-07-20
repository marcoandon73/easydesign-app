import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ForgetPasswordService {
  constructor(private mailerService: MailerService) {}

  async sendMail(email: string, resetLink: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Reset password',
      template: 'forget-password',
      context: {
        name: email,
        resetLink
      },
    });
  }
}

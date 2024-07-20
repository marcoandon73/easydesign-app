import { Body, Injectable, Req, Res } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return JSON.stringify({
      message: 'Hello World! test ci 1',
    });
  }

  healthCheck(): string {
    return JSON.stringify({
      message: 'up',
    });
  }
}

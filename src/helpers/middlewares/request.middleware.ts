import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class RequestMiddleware implements NestMiddleware {
  use(req, res: Response, next) {
    req.requestData = { req };
    next();
  }
}

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import {AuthService} from "../../auth/services/auth.service";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private authService: AuthService) {}

  async use(req: Request, res: Response, next) {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).send('Unauthorized');
    }
    // const user = await this.authService.me();
    // if (!user) {
    //   return res.status(401).send('Unauthorized');
    // }
    // req.user = user;
    next();
  }
}

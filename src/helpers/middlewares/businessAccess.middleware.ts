import { Injectable, NestMiddleware} from '@nestjs/common';
import { Request } from 'express';
import { BusinessAccessValidator } from '../../businesses/dto/business-access.validator';
// import { BusinessAccessValidator } from './business-access.validator';

@Injectable()
export class BusinessAccessMiddleware implements NestMiddleware {
  // constructor(private readonly validator: BusinessAccessValidator) {}

  // resolve(...args: any[]) {
  //   return async (req, res, next) => {
  //     const user = req.user;
  //     console.log('BusinessAccessMiddleware', req.user);
  //     // const validatedParams = await this.validator.validate(req.query, user);
  //     // req.query = validatedParams;
  //     next();
  //   };
  // }

  use(req: any, res: any, next: () => void): any {
    console.log('BusinessAccessMiddleware 2', req.user);
    next();

  }
}

import {Injectable, PipeTransform, ArgumentMetadata, BadRequestException, ExecutionContext} from '@nestjs/common';
import {UsersEntity} from "../../users/entities/users.entity";
import {plainToClass} from "class-transformer";


@Injectable()
export class BusinessAccessValidator implements PipeTransform {

  async transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata;
    return ;
    // const user = req.user;
    // const businessId = value.business_id;

    // Check if the user has access to the specified business
    // if (!user.businesses.includes(businessId)) {
    //   throw new BadRequestException('You do not have access to the specified business');
    // }
    return value;
  }
}

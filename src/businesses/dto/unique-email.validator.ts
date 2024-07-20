import {Injectable} from "@nestjs/common";
import {ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface} from "class-validator";
import {InjectRepository} from "@nestjs/typeorm";
import {Businesses} from "../entities/businesses.entity";
import {Repository} from "typeorm";
import {BusinessesService} from "../services/businesses.service";


@Injectable()
export class IsUniqueEmail {
  constructor(
    private businessService: BusinessesService,
  ) {
  }
  async validate(email: string, args: ValidationArguments) {
    return await this.businessService.findOneByEmail({ email });
  }

  defaultMessage(args: ValidationArguments) {
    return 'Email already exists';
  }
}

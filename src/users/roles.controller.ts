import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  UsePipes,
  Query,
  Body,
  UnauthorizedException,
  UseInterceptors,
  UploadedFile, BadRequestException, Res,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BusinessValidatorPipe } from '../helpers/validators/businessValidator.pipe';
import { User } from '../helpers/decorators/user.decorator';
import { UsersEntity } from '../users/entities/users.entity';
import { FormatResponse } from '../helpers/auth-format-response';
import { UsersService } from './services/users.service';
import { FileInterceptor } from '@nestjs/platform-express';
import {UpdateUserDto} from "./dto/update-user.dto";
import {BusinessesService} from "../businesses/services/businesses.service";
import {GetUserDto} from "./dto/get-user.dto";
import {ValidatorPipe} from "../helpers/validators/validator.pipe";
import {plainToClass} from "class-transformer";
import {UsersDTO} from "./dto/user.dto";
import {AddUserDto} from "./dto/add-user.dto";
import {RolesService} from "./services/roles.service";

@UseGuards(AuthGuard())
@Controller('roles')
export class RolesController {
  constructor(
              private rolesService: RolesService,
              private businessesService: BusinessesService,
              private formatResponse: FormatResponse) {}

  @UsePipes(BusinessValidatorPipe)
  @Get('all')
  async getAll(@Query() params, @User() user: UsersEntity, @Res() res) {
    try {
      const data = await this.rolesService.getAll(user);
      return res.status(200).send(this.formatResponse.formatResponse({ status: 200, data, message: 'Roles retrieved successfully' }));
    } catch (e) {
      console.log('error getAll function', e);
      if (e.status === 500 || !e?.status) {
        return res.status(500).send({ message: 'Internal server error', status: 500 });
      } else {
        return res.status(e.status).send(e);
      }
    }
  }


}

import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query, Res, UploadedFile,
  UseGuards, UseInterceptors,
  UsePipes
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BusinessesService } from './services/businesses.service';
import { FormatResponse } from '../helpers/auth-format-response';
import { BusinessValidatorPipe } from '../helpers/validators/businessValidator.pipe';
import { User } from '../helpers/decorators/user.decorator';
import { UsersEntity } from '../users/entities/users.entity';
import { GetAllBusinessDto } from './dto/getAllBusiness.dto';
import { DeleteBusinessDto } from './dto/deleteBusiness.dto';
import { EditBusinessDto } from './dto/editBusiness.dto';
import { AddBusinessDto } from './dto/addBusiness.dto';
import { GetOneBusinessDto } from './dto/getOneBusiness.dto';
import {UniquebusinessEmailValidatorPipe} from "../helpers/validators/uniquebusinessEmailValidator.pipe";
import {IsUniqueEmail} from "./dto/unique-email.validator";
import {validate} from "class-validator";
import {FileInterceptor} from "@nestjs/platform-express";
import {GetOneBusinessAsGuestDto} from "./dto/getOneBusinessAsGuest.dto";


@Controller('businesses')
export class BusinessesController {
  constructor(private businessesService: BusinessesService,
              private isUniqueEmail: IsUniqueEmail,
              private formatResponse: FormatResponse) {}


  @UseGuards(AuthGuard())
  @Get('all')
  async getAll(params: GetAllBusinessDto, @User() user: UsersEntity, @Res() res) {
    try {
      const data = await this.businessesService.getAll(params, user);
      return res.status(200).send(this.formatResponse.formatResponse({ data }));
    } catch (e) {
      console.log('error getAll function', e);
      if (e.status === 500 || !e?.status) {
        return res.status(500).send({ message: 'Internal server error', status: 500 });
      } else {
        return res.status(e.status).send(e);
      }
    }
  }

  @UseGuards(AuthGuard())
  @UsePipes(BusinessValidatorPipe)
  @Get('getOne')
  async getOne(@Query() params: GetOneBusinessDto, @User() user: UsersEntity, @Res() res) {
    if (!(await this.checkBusinessAccess(user, params.id))) {
      return this.formatResponse.formatErrorResponse({ status: 404, message: 'Business not found' });
    }
    try {
      const data = await this.businessesService.getOne(params);
      return res.status(200).send(this.formatResponse.formatResponse({ data }));
    } catch (e) {
      console.log('error getOne function', e);
      if (e.status === 500 || !e?.status) {
        return res.status(500).send({ message: 'Internal server error', status: 500 });
      } else {
        return res.status(e.status).send(e);
      }
    }
  }

  @UseGuards(AuthGuard())
  @UseInterceptors(FileInterceptor('logo'))
  @UsePipes(BusinessValidatorPipe)
  @Post('add')
  async store(@Body() params: AddBusinessDto, @User() user: UsersEntity, @UploadedFile() logo, @Res() res) {
    try {
      const exists = await this.isUniqueEmail.validate(params.email, null);
      if(exists){
         throw new BadRequestException('Email already exists');
      }
      params.logo = logo || null;
      const data = await this.businessesService.store(params, user);
      return res.status(200).send(this.formatResponse.formatResponse({ data }));
    } catch (e) {
      console.log('e', e);
      if (e.status === 500 || !e?.status) {
        return res.status(500).send({ message: 'Internal server error', status: 500 });
      } else {
        return res.status(e.status).send(e);
      }
    }
  }

  @UseGuards(AuthGuard())
  @UseInterceptors(FileInterceptor('logo'))
  @UsePipes(BusinessValidatorPipe)
  @Put('edit')
  async edit(@Body() params: EditBusinessDto, @User() user: UsersEntity, @UploadedFile() logo, @Res() res) {
    if (!(await this.checkBusinessAccess(user, params.id))) {
      return this.formatResponse.formatErrorResponse({ status: 404, message: 'Business not found' });
    }
    try {
      const exists = await this.isUniqueEmail.validate(params.email, null);
      if(exists && exists.id !== params.id){
        throw new BadRequestException('Email already exists');
      }
      params.logo = logo || null;
      const data = await this.businessesService.edit(params, user);
      return res.status(200).send(this.formatResponse.formatResponse({ data }));
    } catch (e) {
      console.log('error edit function', e);
      if (e.status === 500 || !e?.status) {
        return res.status(500).send({ message: 'Internal server error', status: 500 });
      } else {
        return res.status(e.status).send(e);
      }
    }
  }

  @UseGuards(AuthGuard())
  @UsePipes(BusinessValidatorPipe)
  @Delete('delete')
  async deleteOne(@Body() params: DeleteBusinessDto, @User() user: UsersEntity, @Res() res) {
    if (!(await this.checkBusinessAccess(user, params.id))) {
      return this.formatResponse.formatErrorResponse({ status: 404, message: 'Business not found' });
    }
    try {
      const data = await this.businessesService.deleteOne(params);
      return res.status(200).send(this.formatResponse.formatResponse({ status: 200, message: 'Business deleted successfully' }));
    } catch (e) {
      console.log('error delete function', e);
      if (e.status === 500 || !e?.status) {
        return res.status(500).send({ message: 'Internal server error', status: 500 });
      } else {
        return res.status(e.status).send(e);
      }
    }
  }


  @Post('getOneAsGuest')
  async getOneAsGuest(@Body() params: GetOneBusinessAsGuestDto, @Res() res) {
    try {
      const data = await this.businessesService.getOneAsGuest(params);
      return res.status(200).send(this.formatResponse.formatResponse({ data }));
    } catch (e) {
      console.log('error getOneAsGuest function', e);
      if (e.status === 500 || !e?.status) {
        return res.status(500).send({ message: 'Internal server error', status: 500 });
      } else {
        return res.status(e.status).send(e);
      }
    }
  }


  // Private functions
  private async checkBusinessAccess(user: UsersEntity, businessId: () => number) {
    const businesses = await this.businessesService.getAllUserBusinesses(user);
    return businesses?.find((business) => business.id === +businessId);
  }
}

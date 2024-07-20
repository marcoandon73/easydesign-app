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
  UseInterceptors, UploadedFile, Res, UploadedFiles, HttpStatus
} from '@nestjs/common';
import { BackgroundsService } from './services/backgrounds.service';
import { GetAllBgDto } from './dto/getAllBg.dto';
import { AuthGuard } from '@nestjs/passport';
import { BusinessValidatorPipe } from '../helpers/validators/businessValidator.pipe';
import { User } from '../helpers/decorators/user.decorator';
import { UsersEntity } from '../users/entities/users.entity';
import { BusinessesService } from '../businesses/services/businesses.service';
import { FormatResponse } from '../helpers/auth-format-response';
import { GetOneBgDto } from './dto/getOneBg.dto';
import { AddBgDto } from './dto/addBg.dto';
import { DeleteBgDto } from './dto/deleteBg.dto';
import { EditBgDto } from './dto/editBg.dto';
import {ChangeOrderBGDto} from "./dto/changeOrderBG.dto";
import {FileInterceptor, FilesInterceptor} from "@nestjs/platform-express";

import * as CircularJSON from 'circular-json';

@Controller('backgrounds')
export class BackgroundsController {
  constructor(
    private backgroundsService: BackgroundsService,
    private businessesService: BusinessesService,
    private formatResponse: FormatResponse,
  ) {}

  @UseGuards(AuthGuard())
  @UsePipes(BusinessValidatorPipe)
  @Get('all')
  async getAll(@Query() params: GetAllBgDto, @User() user, @Res() res) {
    try {
      const business = await this.checkBusinessAccess(user, params.business_id);
      if (!business) {
        const err = this.formatResponse.formatErrorResponse({ status: 404, message: 'Business not found' });
        return res.status(404).send(this.formatResponse.formatResponse({ data: err }));
      }
      const data = await this.backgroundsService.getAll(params);
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

  @UsePipes(BusinessValidatorPipe)
  @Get('allAsGuest')
  async getAllAsGuest(@Query() params: GetAllBgDto, @Res() res) {
    try {
      const data = await this.backgroundsService.getAll(params);
      return res.status(200).send(this.formatResponse.formatResponse({ data }));
    } catch (e) {
      console.log('getAllAsGuest', e);
      if (e.status === 500 || !e?.status) {
        return res.status(500).send({ message: 'Internal server error', status: 500 });
      } else {
        return res.status(e.status).send(e);
      }
    }
  }

  @UseGuards(AuthGuard())
  @Get('getOne')
  async getOne(@Query() params: GetOneBgDto, @User() user: UsersEntity, @Res() res) {
    if (!(await this.checkBusinessAccess(user, params.business_id))) {
      return this.formatResponse.formatErrorResponse({ status: 404, message: 'Business not found' });
    }
    try {
      const data = await this.backgroundsService.getOne(params);
      return res.status(200).send(this.formatResponse.formatResponse({ data }));
    } catch (e) {
      console.log('getOne', e);
      if (e.status === 500 || !e?.status) {
        return res.status(500).send({ message: 'Internal server error', status: 500 });
      } else {
        return res.status(e.status).send(e);
      }
    }
  }

  @UseGuards(AuthGuard())
  @UseInterceptors(FilesInterceptor('photos'))
  @UsePipes(BusinessValidatorPipe)
  @Post('add')
  async store(@Body() params: AddBgDto, @User() user: UsersEntity, @UploadedFiles() photos, @Res() res){
    const business = await this.checkBusinessAccess(user, params.business_id)
    if (!business) {
      return this.formatResponse.formatErrorResponse({ status: 404, message: 'Business not found' });
    }
    try {
      params.photos = photos;
      const data = await this.backgroundsService.store(params, business, user);
      // const response = CircularJSON.parse(CircularJSON.stringify({ data }));
      // res.status(HttpStatus.CREATED).send(response);
      return res.status(200).send(this.formatResponse.formatResponse({ message: 'Created successfully' }));
    } catch (e) {
      console.log('add', e);
      if (e.status === 500 || !e?.status) {
        return res.status(500).send({ message: 'Internal server error', status: 500 });
      } else {
        return res.status(e.status).send(e);
      }
    }
  }

  @UseGuards(AuthGuard())
  @UseInterceptors(FilesInterceptor('photos'))
  @UsePipes(BusinessValidatorPipe)
  @Put('edit')
  async edit(@Body() params: EditBgDto, @User() user: UsersEntity, @UploadedFiles() photos, @Res() res) {
    const business = await this.checkBusinessAccess(user, params.business_id);
    if (!business) {
      return res.status(404).send(
        { status: 404, message: 'Business not found' }
      );
    }
    try {
      const data = await this.backgroundsService.edit(params);
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
  async deleteOne(@Body() params: DeleteBgDto, @User() user: UsersEntity, @Res() res) {
    const business = await this.checkBusinessAccess(user, params.business_id);
    if (!business) {
      return this.formatResponse.formatErrorResponse({ status: 404, message: 'Business not found' });
    }
    try {
      const data = await this.backgroundsService.deleteOne(params, business, user);
      return res.status(200).send(this.formatResponse.formatResponse({ status: 200, message: 'Background deleted successfully' }));
    } catch (e) {
      console.log('error deleteOne function', e);
      if (e.status === 500 || !e?.status) {
        return res.status(500).send({ message: 'Internal server error', status: 500 });
      } else {
        return res.status(e.status).send(e);
      }
    }
  }


  @UseGuards(AuthGuard())
  @UsePipes(BusinessValidatorPipe)
  @Post('changeOrder')
  async changeOrder(@Body() params: ChangeOrderBGDto, @User() user: UsersEntity, @Res() res) {
    if (!(await this.checkBusinessAccess(user, params.business_id))) {
      return this.formatResponse.formatErrorResponse({ status: 404, message: 'Business not found' });
    }
    try {
      const data = await this.backgroundsService.changeOrder(params);
      return res.status(200).send(this.formatResponse.formatResponse({ status: 200, data, message: 'Orders updated successfully' }));
    } catch (e) {
      console.log('error changeOrder function', e);
      if (e.status === 500 || !e?.status) {
        return res.status(500).send({ message: 'Internal server error', status: 500 });
      } else {
        return res.status(e.status).send(e);
      }
    }
  }

  // Private functions
  private async checkBusinessAccess(user: UsersEntity, businessId) {
    const businesses = await this.businessesService.getAllUserBusinesses(user);
    return businesses?.find((business) => business.id === +businessId);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
  UsePipes,
  Request,
  UploadedFile,
  UseInterceptors, UploadedFiles,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BusinessesService } from '../businesses/services/businesses.service';
import { FormatResponse } from '../helpers/auth-format-response';
import { BusinessValidatorPipe } from '../helpers/validators/businessValidator.pipe';
import { User } from '../helpers/decorators/user.decorator';
import { UsersEntity } from '../users/entities/users.entity';
import { OrdersService } from './services/orders.service';
import { GetAllOrderDto } from './dto/getAllOrder.dto';
import { GetOneOrderDto } from './dto/getOneOrder.dto';
import { AddOrderDto } from './dto/addOrder.dto';
import { EditOrderDto } from './dto/editOrder.dto';
import { DeleteOrderDto } from './dto/deleteOrder.dto';
import {FileFieldsInterceptor, FileInterceptor} from '@nestjs/platform-express';
import { AddOrderType2Dto } from './dto/addOrderType2.dto';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService, private businessesService: BusinessesService, private formatResponse: FormatResponse) {}

  @UseGuards(AuthGuard())
  @UsePipes(BusinessValidatorPipe)
  @Get('all')
  async getAll(@Query() params: GetAllOrderDto, @User() user: UsersEntity, @Res() res) {
    if (!(await this.checkBusinessAccess(user, params.business_id))) {
      return this.formatResponse.formatErrorResponse({ status: 404, message: 'Business not found' });
    }
    try {
      const data = await this.ordersService.getAll(params);
      return res.status(200).send(this.formatResponse.formatResponse({ data }));
    } catch (e) {
      console.log('e getAll', e);
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
  async getOne(@Query() params: GetOneOrderDto, @User() user: UsersEntity, @Res() res) {
    if (!(await this.checkBusinessAccess(user, params.business_id))) {
      return this.formatResponse.formatErrorResponse({ status: 404, message: 'Business not found' });
    }
    try {
      const data = await this.ordersService.getOne(params);
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

  @Post('add')
  @UseInterceptors(FileInterceptor('photo'))
  async store(@Body() params, @User() user: UsersEntity, @Res() res, @UploadedFile() photo) {
    try {
      params.photo = photo;
      const data = await this.ordersService.store(params);
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

  @Post('addType2')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'photo', maxCount: 1 },
      { name: 'custom_product_photo', maxCount: 1 },
    ]),
  )
  async storeOrderType2(
    @Body() params: AddOrderType2Dto,
    @Res() res,
    @UploadedFiles() files: { photo?: any; custom_product_photo?: any },
  ) {
    try {
      if(files?.photo?.length>0){
        params.photo = files.photo[0];
      }
      if(files?.custom_product_photo?.length>0){
        params.custom_product_photo = files.custom_product_photo[0];
      }
      const data = await this.ordersService.storeOrderType2(params);
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
  @UsePipes(BusinessValidatorPipe)
  @Put('edit')
  async edit(@Body() params: EditOrderDto, @User() user: UsersEntity, @Res() res) {
    if (!(await this.checkBusinessAccess(user, params.business_id))) {
      return this.formatResponse.formatErrorResponse({ status: 404, message: 'Business not found' });
    }
    try {
      const data = await this.ordersService.edit(params);
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
  async deleteOne(@Body() params: DeleteOrderDto, @User() user: UsersEntity, @Res() res) {
    const business = await this.checkBusinessAccess(user, params.business_id);
    if (!business) {
      return this.formatResponse.formatErrorResponse({ status: 404, message: 'Business not found' });
    }
    try {
      const data = await this.ordersService.deleteOne(params, user, business);
      return res.status(200).send(this.formatResponse.formatResponse({ status: 200, message: 'Order deleted successfully' }));
    } catch (e) {
      console.log('error deleteOOne function', e);
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

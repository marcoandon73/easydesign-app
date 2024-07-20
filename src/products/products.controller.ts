import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query, Res,
  UploadedFile, UploadedFiles,
  UseGuards,
  UseInterceptors,
  UsePipes
} from '@nestjs/common';
import { BusinessesService } from '../businesses/services/businesses.service';
import { FormatResponse } from '../helpers/auth-format-response';
import { BusinessValidatorPipe } from '../helpers/validators/businessValidator.pipe';
import { User } from '../helpers/decorators/user.decorator';
import { UsersEntity } from '../users/entities/users.entity';
import { GetAllProductDto } from './dto/getAllProduct.dto';
import { GetOneProductDto } from './dto/getOneProduct.dto';
import { AddProductDto } from './dto/addProduct.dto';
import { EditProductDto } from './dto/editProduct.dto';
import { DeleteProductDto } from './dto/deleteProduct.dto';
import { ProductsService } from './services/products.service';
import { AuthGuard } from '@nestjs/passport';
import { ChangeOrderProductDto } from './dto/changeOrderProduct.dto';
import {FileInterceptor, FilesInterceptor} from "@nestjs/platform-express";

@Controller('products')
export class ProductsController {
  constructor(
    private productsService: ProductsService,
    private businessesService: BusinessesService,
    private formatResponse: FormatResponse,
  ) {}

  @UseGuards(AuthGuard())
  @UsePipes(BusinessValidatorPipe)
  @Get('all')
  async getAll(@Query() params: GetAllProductDto, @User() user, @Res() res) {
    try {
      const business = await this.checkBusinessAccess(user, params.business_id);
      if (!business) {
        const err = this.formatResponse.formatErrorResponse({ status: 404, message: 'Business not found' });
        return res.status(404).send(this.formatResponse.formatResponse({ data: err }));
      }
      const data = await this.productsService.getAll(params);
      return res.status(200).send(this.formatResponse.formatResponse({ data }));
    } catch (e) {
      console.log('error getALl function', e);
      if (e.status === 500 || !e?.status) {
        return res.status(500).send({ message: 'Internal server error', status: 500 });
      } else {
        return res.status(e.status).send(e);
      }
    }
  }

  @UsePipes(BusinessValidatorPipe)
  @Get('allAsGuest')
  async getAllAsGuest(@Query() params: GetAllProductDto, @Res() res) {
    try {
      const data = await this.productsService.getAll(params);
      return res.status(200).send(this.formatResponse.formatResponse({ data }));
    } catch (e) {
      console.log('error getAllAsGuest function', e);
      if (e.status === 500 || !e?.status) {
        return res.status(500).send({ message: 'Internal server error', status: 500 });
      } else {
        return res.status(e.status).send(e);
      }
    }
  }

  @UsePipes(BusinessValidatorPipe)
  @Get('getOne')
  async getOne(@Query() params: GetOneProductDto, @Res() res) {
    try {
      const data = await this.productsService.getOne(params);
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
  @UseInterceptors(FilesInterceptor('photos'))
  @UsePipes(BusinessValidatorPipe)
  @Post('add')
  async store(@Body() params: AddProductDto, @User() user: UsersEntity, @UploadedFiles() photos, @Res() res) {
    const business = await this.checkBusinessAccess(user, params.business_id);
    if (!business) {
      return this.formatResponse.formatErrorResponse({ status: 404, message: 'Business not found' });
    }
    try {
      params.photos = photos;
      const data = await this.productsService.store(params, business, user);
      return res.status(200).send(this.formatResponse.formatResponse({ message: 'Created successfully' }));
    } catch (e) {
      console.log('error store function', e);
      if (e.status === 500 || !e?.status) {
        return res.status(500).send({ message: 'Internal server error', status: 500 });
      } else {
        return res.status(e.status).send(e);
      }
    }
  }

  @UseGuards(AuthGuard())
  @UseInterceptors(FileInterceptor('photo'))
  @UsePipes(BusinessValidatorPipe)
  @Put('edit')
  async edit(@Body() params: EditProductDto, @User() user: UsersEntity, @UploadedFile() photo, @Res() res) {
    if (!(await this.checkBusinessAccess(user, params.business_id))) {
      return this.formatResponse.formatErrorResponse({ status: 404, message: 'Business not found' });
    }
    try {
      const data = await this.productsService.edit(params);
      return res.status(200).send(this.formatResponse.formatResponse({ data }));
    } catch (e) {
      console.log('e edit', e)
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
  async deleteOne(@Body() params: DeleteProductDto, @User() user: UsersEntity, @Res() res) {
    const business = await this.checkBusinessAccess(user, params.business_id);
    if (!business) {
      return this.formatResponse.formatErrorResponse({ status: 404, message: 'Business not found' });
    }
    try {
      const data = await this.productsService.deleteOne(params, business, user);
      return res.status(200).send(this.formatResponse.formatResponse({ status: 200, message: 'Product deleted successfully' }));
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
  async changeOrder(@Body() params: ChangeOrderProductDto, @User() user: UsersEntity, @Res() res) {
    if (!(await this.checkBusinessAccess(user, params.business_id))) {
      return this.formatResponse.formatErrorResponse({ status: 404, message: 'Business not found' });
    }
    try {
      const data = await this.productsService.changeOrder(params);
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
  private async checkBusinessAccess(user: UsersEntity, businessId: () => number) {
    const businesses = await this.businessesService.getAllUserBusinesses(user);
    return businesses?.find((business) => business.id === +businessId);
  }
}

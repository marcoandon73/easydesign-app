import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes
} from '@nestjs/common';
import { BusinessesService } from '../businesses/services/businesses.service';
import { FormatResponse } from '../helpers/auth-format-response';
import { BusinessValidatorPipe } from '../helpers/validators/businessValidator.pipe';
import { GetAllCategoryDto } from './dto/getAllCategory.dto';
import { User } from '../helpers/decorators/user.decorator';
import { UsersEntity } from '../users/entities/users.entity';
import { CategoriesService } from './services/categories.service';
import { GetOneCategoryDto } from './dto/getOneCategory.dto';
import { AddCategoryDto } from './dto/addCategory.dto';
import { EditCategoryDto } from './dto/editCategory.dto';
import { DeleteCategoryDto } from './dto/deleteCategory.dto';
import {AuthGuard} from "@nestjs/passport";
import {FileInterceptor} from "@nestjs/platform-express";

@Controller('categories')
export class CategoriesController {
  constructor(
    private categoriesService: CategoriesService,
    private businessesService: BusinessesService,
    private formatResponse: FormatResponse,
  ) {}

  @UsePipes(BusinessValidatorPipe)
  @Get('all')
  async getAll(@Query() params: GetAllCategoryDto, @Res() res) {
    try {
      const data = await this.categoriesService.getAll(params);
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
  @Get('getOne')
  async getOne(@Query() params: GetOneCategoryDto, @Res() res) {
    try {
      const data = await this.categoriesService.getOne(params);
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
  @UseInterceptors(FileInterceptor('photo'))
  @UsePipes(BusinessValidatorPipe)
  @Post('add')
  async store(@Body() params: AddCategoryDto, @User() user: UsersEntity, @Res() res, @UploadedFile() photo) {
    const business = await this.businessesService.getOne({ id: params.business_id });
    if (!business) {
      return this.formatResponse.formatErrorResponse({ status: 404, message: 'Business not found' });
    }
    try {
      params.photo = photo;
      const data = await this.categoriesService.store(params, business, user);
      return res.status(200).send(this.formatResponse.formatResponse({ data }));
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
  async edit(@Body() params: EditCategoryDto, @User() user: UsersEntity, @Res() res, @UploadedFile() photo) {
    const business = await this.businessesService.getOne({ id: params.business_id });
    if (!business) {
      return this.formatResponse.formatErrorResponse({ status: 404, message: 'Business not found' });
    }
    try {
      params.photo = photo;
      const data = await this.categoriesService.edit(params, business, user);
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
  async deleteOne(@Body() params: DeleteCategoryDto, @User() user: UsersEntity, @Res() res) {
    const business = await this.businessesService.getOne({ id: params.business_id });
    if (!business) {
      return this.formatResponse.formatErrorResponse({ status: 404, message: 'Business not found' });
    }
    try {
      const data = await this.categoriesService.deleteOne(params, business, user);
      return res.status(200).send(this.formatResponse.formatResponse({ status: 200, message: 'Background deleted successfully' }));
    } catch (e) {
      console.log('error deleteone function', e);
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

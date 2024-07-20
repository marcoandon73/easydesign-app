import {Body, Controller, Delete, Get, Post, Put, Query, Res, UseGuards, UsePipes} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BusinessesService } from '../businesses/services/businesses.service';
import { FormatResponse } from '../helpers/auth-format-response';
import { BusinessValidatorPipe } from '../helpers/validators/businessValidator.pipe';
import { User } from '../helpers/decorators/user.decorator';
import { UsersEntity } from '../users/entities/users.entity';
import { GetAllSettingDto } from './dto/getAllSetting.dto';
import { GetOneSettingDto } from './dto/getOneSetting.dto';
import { AddSettingDto } from './dto/addSetting.dto';
import { EditSettingDto } from './dto/editSetting.dto';
import { DeleteSettingDto } from './dto/deleteSetting.dto';
import { SettingsService } from './services/settings.service';

@UseGuards(AuthGuard())
@Controller('settings')
export class SettingsController {
  constructor(
    private settingsService: SettingsService,
    private businessesService: BusinessesService,
    private formatResponse: FormatResponse,
  ) {}

  @UsePipes(BusinessValidatorPipe)
  @Get('getOne')
  async getOne(@Query() params: GetOneSettingDto, @User() user: UsersEntity, @Res() res) {
    if (!(await this.checkBusinessAccess(user, params.business_id))) {
      return this.formatResponse.formatErrorResponse({ status: 404, message: 'Business not found' });
    }
    try {
      const data = await this.settingsService.getOne(params);
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

  @UsePipes(BusinessValidatorPipe)
  @Put('edit')
  async edit(@Body() params: EditSettingDto, @User() user: UsersEntity, @Res() res) {
    if (!(await this.checkBusinessAccess(user, params.business_id))) {
      return this.formatResponse.formatErrorResponse({ status: 404, message: 'Business not found' });
    }
    try {
      const data = await this.settingsService.edit(params);
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

  // Private functions
  private async checkBusinessAccess(user: UsersEntity, businessId: () => number) {
    const businesses = await this.businessesService.getAllUserBusinesses(user);
    return businesses?.find((business) => business.id === +businessId);
  }
}

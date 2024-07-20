import {Controller, Get, Query, Res, UseGuards, UsePipes} from '@nestjs/common';
import {BusinessValidatorPipe} from "../helpers/validators/businessValidator.pipe";
import {GetAllBgDto} from "../backgrounds/dto/getAllBg.dto";
import {User} from "../helpers/decorators/user.decorator";
import {UsersEntity} from "../users/entities/users.entity";
import {AuthGuard} from "@nestjs/passport";
import {BackgroundsService} from "../backgrounds/services/backgrounds.service";
import {BusinessesService} from "../businesses/services/businesses.service";
import {FormatResponse} from "../helpers/auth-format-response";
import {StatsService} from "./services/stats.service";
import {GetStatsDto} from "./dto/getStats.dto";

@UseGuards(AuthGuard())
@Controller('stats')
export class StatsController {

  constructor(
    private statsService: StatsService,
    private businessesService: BusinessesService,
    private formatResponse: FormatResponse,
  ) {}

  @UsePipes(BusinessValidatorPipe)
  @Get('submits')
  async getStatsSubmits(@Query() params: GetStatsDto, @User() user: UsersEntity, @Res() res) {
    if (!(await this.checkBusinessAccess(user, params.business_id))) {
      return this.formatResponse.formatErrorResponse({ status: 404, message: 'Business not found' });
    }
    try {
      const data = await this.statsService.getStatsSubmits(params);
      return res.status(200).send(this.formatResponse.formatResponse({ data }));
    } catch (e) {
      console.log('error getStatsSubmits function', e);
      if (e.status === 500 || !e?.status) {
        return res.status(500).send({ message: 'Internal server error', status: 500 });
      } else {
        return res.status(e.status).send(e);
      }
    }
  }

  @UsePipes(BusinessValidatorPipe)
  @Get('submitsBgs')
  async getStatsSubmitsBgs(@Query() params: GetStatsDto, @User() user: UsersEntity, @Res() res) {
    if (!(await this.checkBusinessAccess(user, params.business_id))) {
      return this.formatResponse.formatErrorResponse({ status: 404, message: 'Business not found' });
    }
    try {
      const data = await this.statsService.getStatsSubmitsBgs(params);
      return res.status(200).send(this.formatResponse.formatResponse({ data }));
    } catch (e) {
      console.log('error getStatsSubmits function', e);
      if (e.status === 500 || !e?.status) {
        return res.status(500).send({ message: 'Internal server error', status: 500 });
      } else {
        return res.status(e.status).send(e);
      }
    }
  }


  @UsePipes(BusinessValidatorPipe)
  @Get('canals')
  async getStatsCanals(@Query() params: GetStatsDto, @User() user: UsersEntity, @Res() res) {
    if (!(await this.checkBusinessAccess(user, params.business_id))) {
      return this.formatResponse.formatErrorResponse({ status: 404, message: 'Business not found' });
    }
    try {
      const data = await this.statsService.getStatsCanals(params);
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

  // for super admin
  @Get('storage_consumption')
  async getStatsStorageConsumption(@Query() params: GetStatsDto, @User() user: UsersEntity, @Res() res) {
    if (!(await this.checkBusinessAccess(user, params.business_id))) {
      return this.formatResponse.formatErrorResponse({ status: 404, message: 'Business not found' });
    }
    // if (user.role?.name !== 'super_admin') {
    //   return this.formatResponse.formatErrorResponse({ status: 403, message: 'Forbidden' });
    // }
    try {
      const data = await this.statsService.getStatsStorageConsumption(params);
      return res.status(200).send(this.formatResponse.formatResponse({ data }));
    } catch (e) {
      console.log('error StorageConsumption function', e);
      if (e.status === 500 || !e?.status) {
        return res.status(500).send({ message: 'Internal server error', status: 500 });
      } else {
        return res.status(e.status).send(e);
      }
    }
  }

  // for super admin
  @Get('storage_actions_history')
  async getStorageActionHistory(@Query() params: GetStatsDto, @User() user: UsersEntity, @Res() res) {
    if (!(await this.checkBusinessAccess(user, params.business_id))) {
      return this.formatResponse.formatErrorResponse({ status: 404, message: 'Business not found' });
    }
    // if (user.role?.name !== 'super_admin') {
    //   return this.formatResponse.formatErrorResponse({ status: 403, message: 'Forbidden' });
    // }
    try {
      const data = await this.statsService.getStorageActionsHistory(params);
      return res.status(200).send(this.formatResponse.formatResponse({ data }));
    } catch (e) {
      console.log('error StorageConsumption function', e);
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

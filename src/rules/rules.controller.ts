import {Body, Controller, Get, Post, Query, Res, UseGuards, UsePipes} from '@nestjs/common';
import { BackgroundsService } from '../backgrounds/services/backgrounds.service';
import { BusinessesService } from '../businesses/services/businesses.service';
import { FormatResponse } from '../helpers/auth-format-response';
import {AddBgDto} from "../backgrounds/dto/addBg.dto";
import {User} from "../helpers/decorators/user.decorator";
import {UsersEntity} from "../users/entities/users.entity";
import {AddRuleDto} from "./dto/AddRule.dto";
import {RulesService} from "./services/rules.service";
import {AuthGuard} from "@nestjs/passport";
import {GetAllRulesDto} from "./dto/getAllRules.dto";
import {GetAllBgDto} from "../backgrounds/dto/getAllBg.dto";

@Controller('rules')
export class RulesController {
  constructor(
    private rulesService: RulesService,
    private businessesService: BusinessesService,
    private formatResponse: FormatResponse,
  ) {}

  @UseGuards(AuthGuard())
  @Get('all')
  async getAll(@Query() params: GetAllRulesDto, @User() user: UsersEntity, @Res() res) {
    const business = await this.checkBusinessAccess(user, params.business_id);
    if (!business) {
      return this.formatResponse.formatErrorResponse({ status: 404, message: 'Business not found' });
    }
    try {
      const data = await this.rulesService.getAll(params, business, user);
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
  @Post('create')
  async create(@Body() params: AddRuleDto, @User() user: UsersEntity, @Res() res) {
    const business = await this.checkBusinessAccess(user, params.business_id);
    if (!business) {
      return this.formatResponse.formatErrorResponse({ status: 404, message: 'Business not found' });
    }
    try {
      const data = await this.rulesService.store(params, business, user);
      return res.status(200).send(this.formatResponse.formatResponse({ data }));
    } catch (e) {
      console.log('e create', e);
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

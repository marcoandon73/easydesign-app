import {Body, Controller, Get, Post, Query, Res, UseGuards, UsePipes} from '@nestjs/common';
import { UsersEntity } from '../users/entities/users.entity';
import { AddRatingDto } from './dto/addRating.dto';
import { RatingService } from './services/rating.service';
import { FormatResponse } from '../helpers/auth-format-response';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../helpers/decorators/user.decorator';
import { GetAllRatingDto } from './dto/getAllRating.dto';
import { BusinessesService } from '../businesses/services/businesses.service';

@Controller('ratings')
export class RatingController {
  constructor(private ratingService: RatingService, private formatResponse: FormatResponse, private businessesService: BusinessesService) {}

  @Post('sendRating')
  async send(@Body() params: AddRatingDto, @Res() res) {
    try {
      const data = await this.ratingService.create(params);
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
  @Get('all')
  async getAll(@Query() params: GetAllRatingDto, @User() user, @Res() res) {
    try {
      if (!(await this.checkBusinessAccess(user, params.business_id))) {
        return this.formatResponse.formatErrorResponse({ status: 404, message: 'Business not found' });
      }

      const data = await this.ratingService.getALl(params);
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

  // Private functions
  private async checkBusinessAccess(user: UsersEntity, businessId: () => number) {
    const businesses = await this.businessesService.getAllUserBusinesses(user);
    return businesses?.find((business) => business.id === +businessId);
  }
}

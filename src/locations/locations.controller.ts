import {Controller, Get, Query, Res, UseGuards, UsePipes} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";
import {BusinessValidatorPipe} from "../helpers/validators/businessValidator.pipe";
import {GetAllOrderDto} from "../orders/dto/getAllOrder.dto";
import {User} from "../helpers/decorators/user.decorator";
import {UsersEntity} from "../users/entities/users.entity";
import {LocationsService} from "./services/locations.service";
import {FormatResponse} from "../helpers/auth-format-response";

@UseGuards(AuthGuard())
@Controller('locations')
export class LocationsController {

  constructor(private locationsService: LocationsService, private formatResponse: FormatResponse){
  }


  @Get('all')
  async getAll(@Res() res) {
    try {
      const data = await this.locationsService.getAll();
      return res.status(200).send(this.formatResponse.formatResponse({ data }));
    } catch (e) {
      console.log('error all function', e);
      if (e.status === 500 || !e?.status) {
        return res.status(500).send({ message: 'Internal server error', status: 500 });
      } else {
        return res.status(e.status).send(e);
      }
    }
  }
}

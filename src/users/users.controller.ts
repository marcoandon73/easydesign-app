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
  UnauthorizedException,
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BusinessValidatorPipe } from '../helpers/validators/businessValidator.pipe';
import { User } from '../helpers/decorators/user.decorator';
import { UsersEntity } from '../users/entities/users.entity';
import { FormatResponse } from '../helpers/auth-format-response';
import { UsersService } from './services/users.service';
import { FileInterceptor } from '@nestjs/platform-express';
import {UpdateUserDto} from "./dto/update-user.dto";
import {BusinessesService} from "../businesses/services/businesses.service";
import {GetUserDto} from "./dto/get-user.dto";
import {ValidatorPipe} from "../helpers/validators/validator.pipe";
import {plainToClass} from "class-transformer";
import {UsersDTO} from "./dto/user.dto";
import {AddUserDto} from "./dto/add-user.dto";
import {RolesService} from "./services/roles.service";

@UseGuards(AuthGuard())
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService,
              private rolesService: RolesService,
              private businessesService: BusinessesService,
              private formatResponse: FormatResponse) {}

  @UsePipes(BusinessValidatorPipe)
  @Get('all')
  async getAll(@Query() params, @User() user: UsersEntity, @Res() res) {
    try {
      // if (await this.rolesService.hasRoles(user, ['admin', 'super'])) {
      //   throw new UnauthorizedException('You are not authorized to access this resource');
      // }
      const business = await this.checkBusinessAccess(user, params.business_id);
      if (!business) {
        throw new UnauthorizedException('You are not authorized to access this resource');
      }
      const data = await this.userService.findAll(params, user);
      return res.status(200).send(this.formatResponse.formatResponse({ status: 200, data, message: 'Users retrieved successfully' }));
    } catch (e) {
      console.log('error getAll function', e);
      if (e.status === 500 || !e?.status) {
        return res.status(500).send({ message: 'Internal server error', status: 500 });
      } else {
        return res.status(e.status).send(e);
      }
    }
  }

  @UseInterceptors(FileInterceptor('avatar'))
  @Post('profile')
  async profile(@Body() params, @User() user: UsersEntity, @UploadedFile() avatar, @Res() res) {
    try {
      const data = await this.userService.updateProfile(params, user, avatar);
      return res.status(200).send(this.formatResponse.formatResponse({ status: 200, data, message: 'Profile updated successfully' }));
    } catch (e) {
      console.log('error profile function', e);
      if (e.status === 500 || !e?.status) {
        return res.status(500).send({ message: 'Internal server error', status: 500 });
      } else {
        return res.status(e.status).send(e);
      }
    }
  }


  @Post('updateMyPassword')
  async updateAuthenticatedUserPassword(@Body() params, @User() user: UsersEntity, @Res() res) {
    try {
      const data = await this.userService.updateMyPassword(params, user);
      return res.status(200).send(this.formatResponse.formatResponse({ status: 200, data, message: 'Password updated successfully' }));
    } catch (e) {
      console.log('error updateAuthenticatedUserPassword function', e);
      if (e.status === 500 || !e?.status) {
        return res.status(500).send({ message: 'Internal server error', status: 500 });
      } else {
        return res.status(e.status).send(e);
      }
    }
  }

  @UsePipes(BusinessValidatorPipe)
  @Get('getOne')
  async getOne(@Query() params: GetUserDto, @User() user: UsersEntity, @Res() res) {
    try {
      if(user.id !== +params.id) {
        const business = await this.checkBusinessAccess(user, params.business_id);
        if (!business) {
          throw new UnauthorizedException('You are not authorized to access this resource');
        }
      }
      const data = await this.userService.getOne(params, user);
      return res.status(200).send(this.formatResponse.formatResponse({ data: plainToClass(UsersDTO, data) }));
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
  @Post('add')
  async store(@Body() params: AddUserDto, @User() user: UsersEntity, @Res() res) {
    try {
      const business = await this.checkBusinessAccess(user, params.business_id);
      if (!business) {
        throw new UnauthorizedException('You are not authorized to access this resource');
      }
      const data = await this.userService.create(params, user);
      return res.status(200).send(this.formatResponse.formatResponse({ data: plainToClass(UsersDTO, data) }));
    } catch (e) {
      console.log('error store function', e);
      if (e.status === 500 || !e?.status) {
        return res.status(500).send({ message: 'Internal server error', status: 500 });
      } else {
        return res.status(e.status).send(e);
      }
    }
  }

  @Put('edit')
  async edit(@Body() params: UpdateUserDto, @User() user: UsersEntity, @Res() res) {
    try {
      const business = await this.checkBusinessAccess(user, params.business_id);
      if (!business) {
        throw new UnauthorizedException('You are not authorized to access this resource');
      }
      const data = await this.userService.update(params, user);
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

  @Delete('delete')
  async deleteOne(@Body() params, @User() user: UsersEntity, @Res() res) {
    try {
      const business = await this.checkBusinessAccess(user, params.business_id);
      if (!business) {
        throw new UnauthorizedException('You are not authorized to access this resource');
      }
      const data = await this.userService.delete(params, user);
      return res.status(200).send(this.formatResponse.formatResponse({ data }));
    } catch (e) {
      console.log('error deleteOne function', e);
      if (e.status === 500 || !e?.status) {
        return res.status(500).send({ message: 'Internal server error', status: 500 });
      } else {
        return res.status(e.status).send(e);
      }
    }
  }

  @Post('block')
  async block(@Body() params, @User() user: UsersEntity, @Res() res) {
    try {
      const business = await this.checkBusinessAccess(user, params.business_id);
      if (!business) {
        throw new UnauthorizedException('You are not authorized to access this resource');
      }
      const data = await this.userService.block(params, user);
      return res.status(200).send(this.formatResponse.formatResponse({ data }));
    } catch (e) {
      console.log('error blok function', e);
      if (e.status === 500 || !e?.status) {
        return res.status(500).send({ message: 'Internal server error', status: 500 });
      } else {
        return res.status(e.status).send(e);
      }
    }
  }

  @Post('unblock')
  async unblock(@Body() params, @User() user: UsersEntity, @Res() res) {
    try {
      const business = await this.checkBusinessAccess(user, params.business_id);
      if (!business) {
        throw new UnauthorizedException('You are not authorized to access this resource');
      }
      const data = await this.userService.unblock(params, user);
      return res.status(200).send(this.formatResponse.formatResponse({ data }));
    } catch (e) {
      console.log('error unblock function', e);
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

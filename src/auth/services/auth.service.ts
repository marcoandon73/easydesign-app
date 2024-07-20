import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { LoggerService } from 'src/logger/logger.service';
import { UsersService } from '../../users/services/users.service';
import { LoginDto } from '../dto/loginDto';
import { FormatResponse } from '../../helpers/auth-format-response';
import { Repository } from 'typeorm';
import { PasswordResetsEntity } from '../entities/passwordResets.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ForgetPasswordService } from './forget-password.service';
import { ValidateAccountService } from './validate-account.service';
import { VerifyUsersEntity } from '../entities/verifyUsers.entity';
import { UsersEntity } from '../../users/entities/users.entity';
import { AddUserDto } from '../../users/dto/add-user.dto';
import { sign } from 'jsonwebtoken';
import { BusinessesService } from '../../businesses/services/businesses.service';
import { AddBusinessDto } from '../../businesses/dto/addBusiness.dto';
import { RolesService } from '../../users/services/roles.service';
import { RegisterDto } from '../dto/registerDto';
import {SettingsService} from "../../settings/services/settings.service";
import {SendPasswordResetLinkDto} from "../dto/sendPasswordResetLinkDto";
import {Businesses} from "../../businesses/entities/businesses.entity";

const saltSize = 10;
enum Provider {
  GOOGLE = 'google',
}

@Injectable()
export class AuthService {
  private JWT_SECRET_KEY = 'VERY_SECRET_KEY';
  constructor(
    private readonly logger: LoggerService = new Logger(AuthService.name),
    private jwtService: JwtService,
    private userservice: UsersService,
    private formatResponse: FormatResponse,
    private forgetPasswordService: ForgetPasswordService,
    private validateAccountService: ValidateAccountService,
    private bussinessService: BusinessesService,
    private settingsService: SettingsService,
    private rolesService: RolesService,
    @InjectRepository(PasswordResetsEntity) private passwordResetRepository: Repository<PasswordResetsEntity>,
    @InjectRepository(VerifyUsersEntity) private verifyUsersRepository: Repository<VerifyUsersEntity>,
  ) {}

  async login(user: any): Promise<Record<string, any>> {
    // Validation Flag

    // Transform body into DTO
    const loginDto = new LoginDto();
    loginDto.email = user.email;
    loginDto.password = user.password;

    // Get user information
    const userDetails = await this.userservice.findOne(user.email, ['role', 'businesses']);

    // Check if user exists
    if (userDetails == null) {
      return { status: 401, msg: { msg: 'Invalid credentials' } };
    }

    if(!userDetails.isActive){
      return this.formatResponse.formatErrorResponse({ status: 401, message: 'User is not active' });
    }

    if(userDetails.role?.name === 'super'){
      const businesses = await this.bussinessService.getAll({ page: 1, pageSize: 1000, all: true }, userDetails);
      if (Array.isArray(businesses)) {
        userDetails.businesses = businesses;
      }
    }

    // Check if the given password match with saved password
    const isValid = await bcrypt.compare(user.password, userDetails.password);
    if (isValid) {
      if( !['admin', 'super'].includes(userDetails.role.name) && !(userDetails.businesses?.length>0) ){
        return this.formatResponse.formatErrorResponse({ status: 401, message: 'No business available' });
      }
      return this.formatResponse.formatAuthResponse({
        status: 200,
        user: userDetails,
        token: this.jwtService.sign({ email: user.email }),
      });
    } else {
      // Password or email does not match
      return this.formatResponse.formatErrorResponse({ status: 401 });
    }
  }

  async register(body: RegisterDto): Promise<Record<string, any>> {
    // Transform body into DTO
    const userDTO = new AddUserDto();
    userDTO.email = body.email;
    userDTO.name = body.name;
    const salt = await bcrypt.genSalt(saltSize);
    userDTO.salt = salt;
    userDTO.password = body.password;
    userDTO.roleId = (await this.rolesService.getRoleByName('admin'))?.id;

    // Validate DTO against validate function from class-validator
    if (!(await this.userservice.isEmailUnique(userDTO.email))) {
      return this.formatResponse.formatErrorResponse({ status: 400, message: 'Email already exists' });
    }

    const user = await this.userservice.create(userDTO, null);
    if (user) {
      const new_business_dto: AddBusinessDto = {
        address: null,
        description: null,
        email: user.email,
        location_id: 240,
        logo: null,
        messenger_link: null,
        phone: null,
        name: body.business_name || 'demobusiness',
      };
      const newbusiness = await this.bussinessService.store(new_business_dto, user);
      await this.settingsService.getOne({ business_id: newbusiness.id });
      const userDetails = await this.userservice.findOneById(user.id, ['role', 'businesses']);
      this.sendEmailToVerifyUser(userDetails);
      return this.formatResponse.formatAuthResponse({
        status: 200,
        token: this.jwtService.sign({ email: user.email }),
        user: userDetails,
        message: 'User created successfully',
      });
    }
  }

  async me(req, user): Promise<Record<string, any>> {
    console.log('me', user);
    if(!user.isActive){
      return this.formatResponse.formatErrorResponse({ status: 401, message: 'User is not active' });
    }
    const userData = await this.userservice.findOneById(user.id, ['role', 'businesses']);
    if(userData.role?.name === 'super'){
      const businesses = await this.bussinessService.getAll({ page: 1, pageSize: 1000, all: true }, userData);
      if (Array.isArray(businesses)) {
        userData.businesses = businesses;
      }
    }
    return this.formatResponse.formatAuthResponse({
      status: 200,
      user: userData,
      token: req.headers?.authorization?.split(' ')[1],
    });
  }

  async sendResetPasswordLink(body: SendPasswordResetLinkDto): Promise<Record<string, any>> {
    const token = await this.createRPToken(body.email);
    const link = process.env.frontend_url + '/auth/reset-password?token=' + token + '&email=' + body.email;
    await this.forgetPasswordService.sendMail(body.email, link);
    return this.formatResponse.formatAuthResponse({
      status: 200,
      message: 'Email sent successfully',
    });
  }

  private async createRPToken(email) {
    const oldToken = await this.passwordResetRepository.findOne({ email });
    if (oldToken) {
      return oldToken.token;
    }

    const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    await this.passwordResetRepository.save({
      email,
      token,
    });
    return token;
  }

  private async createVerifyUSerToken(userId) {
    const oldToken = await this.verifyUsersRepository.findOne({ userId });
    if (oldToken) {
      return oldToken.token;
    }

    const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    await this.verifyUsersRepository.save({
      userId,
      token,
    });
    return token;
  }

  // resetPassword
  async resetPassword(params: { email: string; token: string; new_password: string }): Promise<Record<string, any>> {
    const rsetPasswordRecord = await this.getPasswordResetEmail(params);

    if (rsetPasswordRecord.email) {
      const changePass = await this.changePassword(params);
      if (!changePass) {
        return this.formatResponse.formatErrorResponse({
          status: 404,
          message: 'User not found',
        });
      }
      this.deleteResetPasswordRecod(rsetPasswordRecord.id);
    } else {
      return this.formatResponse.formatErrorResponse({
        status: 400,
        message: 'Email or token not valid',
      });
    }

    return this.formatResponse.formatAuthResponse({
      status: 200,
      message: 'Password changed successfully',
    });
  }

  private async deleteResetPasswordRecod(id): Promise<Record<string, any>> {
    return await this.passwordResetRepository.delete({ id });
  }

  private async changePassword(params: { email: string; new_password: string }) {
    const { email, new_password } = params;
    const user = await this.userservice.findOne(email);

    if (user) {
      const salt = await bcrypt.genSalt(saltSize);
      user.salt = salt;
      user.password = bcrypt.hashSync(new_password, salt);
      return await this.userservice.selfUpdate(user);
    } else {
      return null;
    }
  }

  private async getPasswordResetEmail(params: { email: string; token: string }) {
    return await this.passwordResetRepository.findOne({ token: params.token, email: params.email }, { order: { created_at: -1 } });
  }

  // askEmailValidation
  async sendEmailToVerifyUser(user): Promise<Record<string, any>> {
    const token = await this.createVerifyUSerToken(user.id);
    const link = process.env.frontend_url + '/auth/verify/' + token;
    await this.validateAccountService.sendMail(user.email, user.name, link);
    return this.formatResponse.formatAuthResponse({
      status: 200,
      message: 'Email sent successfully',
    });
  }

  // verify email
  async verifyEmail(token: string): Promise<Record<string, any>> {
    const verifyAccountRecord = await this.verifyUsersRepository.findOne({ token }, { order: { created_at: -1 } });
    if (verifyAccountRecord?.userId) {
      // get the user and update it
      const user = await this.userservice.findOneById(verifyAccountRecord.userId);
      if (!user) {
        return this.formatResponse.formatErrorResponse({
          status: 404,
          message: 'User not found',
        });
      }
      if (user.email_verified_at) {
        return this.formatResponse.formatAuthResponse({
          status: 200,
          message: 'Email already verified',
        });
      }
      user.email_verified_at = new Date();
      await this.userservice.selfUpdate(user);
      await this.verifyUsersRepository.delete({ id: verifyAccountRecord.id });
    } else {
      return this.formatResponse.formatErrorResponse({
        status: 400,
        message: 'Token not valid',
      });
    }

    return this.formatResponse.formatAuthResponse({
      status: 200,
      message: 'Email verified successfully',
    });
  }

  async validateOAuthLogin(thirdPartyId: string, provider: Provider): Promise<string> {
    try {
      // You can add some registration logic here,
      // to register the user using their thirdPartyId (in this case their googleId)
      // let user: IUser = await this.usersService.findOneByThirdPartyId(thirdPartyId, provider);

      // if (!user)
      // user = await this.usersService.registerOAuthUser(thirdPartyId, provider);

      const payload = {
        thirdPartyId,
        provider,
      };

      const jwt: string = sign(payload, this.JWT_SECRET_KEY, { expiresIn: 3600 });
      return jwt;
    } catch (err) {
      throw new InternalServerErrorException('validateOAuthLogin', err.message);
    }
  }
}

import { Body, Controller, Get, Post, Req, Res, UseGuards, UsePipes } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { UsersService } from '../users/services/users.service';
import { User } from '../helpers/decorators/user.decorator';
// import { AuthGuard } from '@nestjs/passport';
import { ValidatorPipe } from '../helpers/validators/validator.pipe';
import { LoginDto } from './dto/loginDto';
import { RegisterDto } from './dto/registerDto';
import { SendPasswordResetLinkDto } from './dto/sendPasswordResetLinkDto';
import { ResetPasswordDto } from './dto/resetPasswordDto';
import { VerifyEmailDto } from './dto/verifyEmailDto';
import {JwtAuthGuard} from "@/auth/strategy/jwt-auth.guard";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private userService: UsersService) {}

  @UsePipes(ValidatorPipe)
  @Post('login')
  async login(@Req() req, @Res() res, @Body() body: LoginDto) {
    const auth = await this.authService.login(body);
    res.status(auth.status).json(auth);
  }

  @UsePipes(ValidatorPipe)
  @Post('register')
  async register(@Res() res, @Body() body: RegisterDto) {
    console.log('body', body);
    try {
      const auth = await this.authService.register(body);
      res.status(auth.status).send(auth);
    } catch (e) {
      // this.logger.debug(e.message);
      console.log('error 2', e);
      return res.status(e.status).send(e);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Req() req, @Res() res, @User() user) {
    console.log('me user', user)
    try {
    const auth = await this.authService.me(req, user);
    res.status(auth.status).json(auth);
  } catch (e) {
    // this.logger.debug(e.message);
      console.log('error me', e);
    return res.status(e.status).send(e);
  }
  }

  @UsePipes(ValidatorPipe)
  @Post('sendPasswordResetLink')
  async sendEmail(@Body() body: SendPasswordResetLinkDto, @Res() res) {
    const auth = await this.authService.sendResetPasswordLink(body);
    res.status(auth.status).json(auth);
  }

  @UsePipes(ValidatorPipe)
  @Post('resetPassword')
  async resetPassword(@Body() body: ResetPasswordDto, @Res() res) {
    const auth = await this.authService.resetPassword(body);
    res.status(auth.status).json(auth);
  }

  @UseGuards(JwtAuthGuard)
  @Get('askEmailValidation')
  async askEmailValidation(@Res() res, @User() user) {
    const auth = await this.authService.sendEmailToVerifyUser(user);
    res.status(auth.status).json(auth);
  }

  @UsePipes(ValidatorPipe)
  @Post('verifyEmail')
  async verifyEmail(@Res() res, @Body() params: VerifyEmailDto) {
    const auth = await this.authService.verifyEmail(params.token);
    res.status(auth.status).json(auth);
  }

  // @Get('google')
  // @UseGuards(AuthGuard('google'))
  // googleLogin() {
  //   // initiates the Google OAuth2 login flow
  // }

  // @Get('google/callback')
  // @UseGuards(AuthGuard('google'))
  // googleLoginCallback(@Req() req, @Res() res) {
  //   // handles the Google OAuth2 callback
  //   const jwt: string = req.user.jwt;
  //   if (jwt) res.redirect('http://localhost:4200/login/succes/' + jwt);
  //   else res.redirect('http://localhost:4200/login/failure');
  // }
}

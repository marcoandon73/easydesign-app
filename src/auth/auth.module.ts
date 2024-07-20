import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'src/logger/logger.module';
import { UsersEntity } from '../users/entities/users.entity';
import { HelpersModule } from '../helpers/helpers.module';
import { AuthService } from './services/auth.service';
import { PasswordResetsEntity } from './entities/passwordResets.entity';
import { ForgetPasswordService } from './services/forget-password.service';
import { ValidateAccountService } from './services/validate-account.service';
import { VerifyUsersEntity } from './entities/verifyUsers.entity';
import { GoogleStrategy } from './strategy/google.strategy';
import { BusinessesModule } from '../businesses/businesses.module';
import {SettingsModule} from "../settings/settings.module";

@Module({
  imports: [
    LoggerModule,
    PassportModule.register({ defaultStrategy: 'jwt', property: 'user', session: false }),
    // PassportModule.register({
    //   defaultStrategy: 'google',
    // }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        privateKey: configService.get<string>('keys.privateKey'),
        publicKey: configService.get<string>('keys.publicKey'),
        signOptions: { expiresIn: '3600s', algorithm: 'RS256' },
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    TypeOrmModule.forFeature([PasswordResetsEntity, VerifyUsersEntity, UsersEntity]),
    HelpersModule,
    BusinessesModule,
    SettingsModule,
  ],
  providers: [AuthService, JwtStrategy, ForgetPasswordService, ValidateAccountService, GoogleStrategy],
  exports: [AuthService, JwtModule, PassportModule],
  controllers: [AuthController],
})
export class AuthModule {}

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
// import { AuthService, Provider } from './auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: 'CLIENT_ID', // <- Replace this with your client id
      clientSecret: 'CLIENT_SECRET', // <- Replace this with your client secret
      callbackURL: 'http://localhost:3003/auth/google/callback',
      passReqToCallback: true,
      scope: ['profile'],
    });
  }

  async validate(request: any, accessToken: string, refreshToken: string, profile, done) {
    try {
      console.log('profile', profile);

      // const jwt: string = await this.authService.validateOAuthLogin(profile.id, Provider.GOOGLE);
      // const user = {
      //   jwt,
      // };

      // done(null, user);
    } catch (err) {
      // console.log(err)
      done(err, false);
    }
  }
}

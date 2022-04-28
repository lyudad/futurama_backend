import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { config } from 'dotenv';
import { Injectable } from '@nestjs/common';

config();

interface GoogleProfile {
  name:{
    givenName:string
    familyName:string
  },
  emails:object,
  photos:object
}

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_STRATEGY_CALLBACKURL,
      scope: ['email', 'profile'],
    });
  }

  async validate (accessToken: string, refreshToken: string, profile:GoogleProfile, done: VerifyCallback): Promise<void> {
    const { name, emails, photos } = profile
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken
    }
    done(null, user);
  }
}
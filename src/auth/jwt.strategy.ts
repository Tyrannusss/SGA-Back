import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
constructor(private configService: ConfigService) {
  super({
jwtFromRequest: ExtractJwt.fromExtractors([
  (req) => {
    //console.log("COOKIES IN STRATEGY:", req?.cookies);
    return req?.cookies?.token;
  },
]),
    secretOrKey: configService.get<string>('JWT_SECRET'),
  });
}

  async validate(payload: any) {
     // console.log("VALIDATE CALLED");
  //console.log(payload);
    return {
      id: payload.sub,
      email: payload.email,
    };
  }
}
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, NotFoundException } from '@nestjs/common';
import { JWT_SECRET } from '../const';
import { IJWTPayload, IJWTResponse } from '../interface/jwt.interface';
import { ConfigService } from '@nestjs/config';
import UserService from '~/user/user.service';
import { USER_NOT_FOUND } from '~/user/const';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService:ConfigService,
    private readonly userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>(JWT_SECRET),
    });
  }

  async validate({email, sub: id}: IJWTPayload): Promise<IJWTResponse> {
    let user = await this.userService.getUser(id);

    if(!user) {
      throw new NotFoundException(USER_NOT_FOUND);
    }

    user = user.toObject()

    return user;
  }
}
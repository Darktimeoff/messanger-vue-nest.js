import { BadRequestException, Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import UserService from '~/user/user.service';
import { JWT_SECRET, USER_NOT_FOUND, USER_WRONG_PASSWORD } from './const';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '~/user/entities/user.entity';
import { IJWTPayload } from './interface/jwt.interface';
import { Types } from 'mongoose';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {

    }

    async validateUser({email, password}: LoginAuthDto) {
        const user = await this.userService.findByEmail(email);

        if(!user) {
            throw new BadRequestException(USER_WRONG_PASSWORD)
        }

        const {password: passwordHash, ...userData} = user.toObject<User>();

        const isMatch = await compare(password, passwordHash);

        if(!isMatch) {
            throw new BadRequestException(USER_WRONG_PASSWORD)
        }

        return userData;
    }

    async validateToken(token: string) {
        const secret = this.configService.get<string>(JWT_SECRET);
        const jwtPayload = await this.jwtService.verifyAsync<IJWTPayload>(token, {secret});
        const user = (await this.userService.getUser(jwtPayload.sub))?.toObject();

        if(!user) {
            throw new Error(USER_NOT_FOUND);
        }

        return user;
    }

    async login(user: Omit<User & {_id: string | Types.ObjectId}, 'password'>) {
        const payload: IJWTPayload = {email: user.email, sub: user._id as any}
        const token = await this.jwtService.signAsync(payload);

        return {
            access_token: token,
            ...user
        }
    }
}

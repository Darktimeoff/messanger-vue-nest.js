import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import UserService from '~/user/user.service';
import { USER_NOT_FOUND, USER_WRONG_PASSWORD } from './const';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '~/user/entities/user.entity';
import { IJWTPayload } from './interface/jwt.interface';
import { Types } from 'mongoose';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private jwtService: JwtService
    ) {

    }

    async validateUser({email, password}: LoginAuthDto) {
        const user = await this.userService.findByEmail(email);

        if(!user) {
            throw new NotFoundException(USER_NOT_FOUND)
        }

        const {password: passwordHash, ...userData} = user.toObject<User>();

        const isMatch = await compare(password, passwordHash);

        if(!isMatch) {
            throw new UnauthorizedException(USER_WRONG_PASSWORD)
        }

        return userData;
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

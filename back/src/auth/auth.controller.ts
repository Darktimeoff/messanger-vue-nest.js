import { BadRequestException, Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { CreateUserDto } from '~/user/dto/create-user.dto';
import UserService from '~/user/user.service';
import { AuthService } from './auth.service';
import { USER_EXISTS, USER_NOT_FOUND, USER_WRONG_PASSWORD } from './const';
import { LoginAuthDto } from './dto/login-auth.dto';
import { LoginReponse } from './interface/jwt.interface';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ) {

    }

    @ApiOkResponse({
        description: 'User login',
        type: LoginReponse
    })
    @ApiNotFoundResponse({
        description: USER_NOT_FOUND,
    })
    @ApiUnauthorizedResponse({
        description: USER_WRONG_PASSWORD
    })
    @Post('login') 
    @HttpCode(200)
    async login(@Body() dto: LoginAuthDto) {
        const user = await this.authService.validateUser(dto);
        const response = await this.authService.login(user);

        return response;
    }

    @ApiOkResponse({
        description: 'User register and login',
        type: LoginReponse
    })
    @Post('register')
    @HttpCode(200)
    async register(@Body() dto: CreateUserDto) {
        const existUser = await this.userService.findByEmail(dto.email);

        if(existUser) {
            throw new BadRequestException(USER_EXISTS)
        }

        const user = await this.userService.create(dto);
        const response = await this.authService.login(user);

        return response;
    }
}

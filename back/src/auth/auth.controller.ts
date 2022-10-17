import { BadRequestException, Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { TypesFailedResponse } from '~/types';
import { CreateUserDto } from '~/user/dto/create-user.dto';
import UserService from '~/user/user.service';
import { AuthService } from './auth.service';
import { USER_EXISTS, USER_NOT_FOUND, USER_WRONG_PASSWORD } from './const';
import { LoginAuthDto } from './dto/login-auth.dto';
import { LoginReponse } from './interface/jwt.interface';

@ApiTags('auth')
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
    @ApiBadRequestResponse({
        description: 'Validation data failed',
        type: TypesFailedResponse
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
    @ApiBadRequestResponse({
        description: USER_EXISTS,
        type: TypesFailedResponse
    })
    @Post('register')
    @HttpCode(200)
    async register(@Body() dto: CreateUserDto) {
        const existUser = await this.userService.findByEmail(dto.email);

        if(existUser) {
            throw new BadRequestException(USER_EXISTS)
        }

        const user = await this.userService.create(dto);
        const response = await this.authService.login(user.toObject());

        return response;
    }
}

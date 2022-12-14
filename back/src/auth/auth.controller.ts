import { BadRequestException, Body, Controller, Get, HttpCode, NotFoundException, Post, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TypesFailedResponse } from '~/types';
import { CreateUserDto } from '~/user/dto/create-user.dto';
import { User } from '~/user/entities/user.entity';
import UserService from '~/user/user.service';
import { AuthService } from './auth.service';
import { INVALID_HASH, USER_EXISTS, USER_NOT_FOUND, VERIFY_HASH_SUCCESS } from './const';
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
        description: 'User register',
        type: User
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
        //ToDO when rewrite on send mail verifycation remove this part and 
        const user = await this.userService.create(dto);

        return user;
    }

    @ApiBadRequestResponse({
        description: INVALID_HASH
    })
    @ApiOkResponse({
        description: "Verify User",
        type: LoginReponse
    })
    @Get('verify')
    async verify(@Query('hash') hash: string) {
        if(!hash) {
            throw new BadRequestException(INVALID_HASH)
        }

        let user = await this.userService.findByVerifyHash(hash);

        if(!user) {
            throw new BadRequestException(INVALID_HASH);
        }

        user = await this.userService.updateUser(user._id.toString(), {
            isConfirmed: true
        });


        if(!user) {
            throw new NotFoundException(USER_NOT_FOUND);
        }
        
        //ToDo add send real email
        
        return {
            message: VERIFY_HASH_SUCCESS
        };
    }
}

import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { ID_VALIDATION_ERROR } from "src/pipe/id-validation.contstants";
import { IdValidationPipe } from './../pipe/id-validation.pipe';
import { USER_NOT_FOUND } from "./const";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import UserService from "./user.service";

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {

    }

    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: User
    })
    @Post('') 
    @UsePipes(new ValidationPipe())
    async createUser(@Body() dto: CreateUserDto) {
        const user = await this.userService.create(dto);

        return user;
    }

    @ApiOkResponse({
        description: 'User successfully finded',
        type: User
    })
    @ApiNotFoundResponse({
        description: USER_NOT_FOUND
    })
    @ApiBadRequestResponse({
        description: ID_VALIDATION_ERROR
    })
    @Get(':id')
    async getUser(@Param('id', IdValidationPipe) id: string) {
        const user = await this.userService.getUser(id)

        if (!user) {
            throw new NotFoundException(USER_NOT_FOUND);
        }

        return user;
    }

    @ApiOkResponse({
        description: 'Update information about user',
        type: User
    })
    @ApiNotFoundResponse({
        description: USER_NOT_FOUND
    })
    @ApiBadRequestResponse({
        description: ID_VALIDATION_ERROR
    })
    @Patch(':id')
    async updateUser(@Param('id', IdValidationPipe) id: string, @Body() dto: UpdateUserDto) {
        const user = await this.userService.updateUser(id, dto);

        if(!user) {
            throw new NotFoundException(USER_NOT_FOUND)
        }

        return user;
    }

    @ApiOkResponse({
        description: 'User successfully deleted'
    })
    @ApiNotFoundResponse({
        description: USER_NOT_FOUND
    })
    @ApiBadRequestResponse({
        description: ID_VALIDATION_ERROR
    })
    @Delete(':id')
    async deleteUser(@Param('id', IdValidationPipe) id: string) {
        const user = await this.userService.deleteUser(id)

        if (!user) {
            throw new NotFoundException(USER_NOT_FOUND);
        }
    }
}

export default UserController;
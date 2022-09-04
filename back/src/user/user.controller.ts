import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, UseGuards, Request} from "@nestjs/common";
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "~/auth/guard/jwt-auth.guard";
import { IReqAuth } from "~/auth/interface/jwt.interface";
import { ID_VALIDATION_ERROR } from "./../pipe/id-validation.contstants";
import { IdValidationPipe } from './../pipe/id-validation.pipe';
import { USER_NOT_FOUND } from "./const";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import UserService from "./user.service";

@UseGuards(JwtAuthGuard)
@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {

    }

    @ApiOkResponse({
        description: 'get current user',
        type: User
    })
    @ApiNotFoundResponse({
        description: USER_NOT_FOUND
    })
    @ApiBadRequestResponse({
        description: ID_VALIDATION_ERROR
    })
    @Get('')
    async getUser(@Request() req: IReqAuth) {
        const user = await this.userService.getUser(req.user.id)

        if (!user) {
            throw new NotFoundException(USER_NOT_FOUND);
        }

        return user;
    }

    @ApiOkResponse({
        description: 'Update information about current user',
        type: User
    })
    @ApiNotFoundResponse({
        description: USER_NOT_FOUND
    })
    @ApiBadRequestResponse({
        description: ID_VALIDATION_ERROR
    })
    @Patch('')
    async updateCurrentUser(@Request() req: IReqAuth, @Body() dto: UpdateUserDto) {
        const user = await this.userService.updateUser(req.user.id, dto);

        if(!user) {
            throw new NotFoundException(USER_NOT_FOUND)
        }

        return user;
    }

    @ApiOkResponse({
        description: 'Current user successfully deleted'
    })
    @ApiNotFoundResponse({
        description: USER_NOT_FOUND
    })
    @ApiBadRequestResponse({
        description: ID_VALIDATION_ERROR
    })
    @Delete('')
    async deleteCurrentUser(@Request() req: IReqAuth) {
        const user = await this.userService.deleteUser(req.user.id)

        if (!user) {
            throw new NotFoundException(USER_NOT_FOUND);
        }
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
    async findUser(@Param('id', IdValidationPipe) id: string) {
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
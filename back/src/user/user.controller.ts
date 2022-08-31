import { Controller, Post } from "@nestjs/common";
import UserService from "./user.service";

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {

    }

    @Post('/') 
    async createUser() {
        const user = await this.userService.create();

        return user;
    }
}

export default UserController;
import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('/') 
    async create() {
        const user = await this.userService.create();
    
        return user;
    }
}

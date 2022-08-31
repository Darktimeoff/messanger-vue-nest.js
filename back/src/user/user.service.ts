import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from './user.model';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User')
        private readonly userModel: Model<UserDocument>,
    ) {

    }

    async create() {
        return this.userModel.create({
            fullname: "yevhenii",
            email: 'yevhenii+10@devforth.io'
        })
    }
}

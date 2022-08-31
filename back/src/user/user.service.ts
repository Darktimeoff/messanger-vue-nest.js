import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import {UserDocument} from './entities/user.entity';

@Injectable()
class UserService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<UserDocument>
    ) {

    }

    async create(dto: CreateUserDto) {
        return this.userModel.create(dto);
    }

    async getUser(id: string) {
        return this.userModel.findById(id).exec()
    }

    async deleteUser(id: string) {
        return this.userModel.findByIdAndDelete(id).exec()
    }

    async updateUser(id: string, dto: UpdateUserDto) {
        return this.userModel.findByIdAndUpdate(id, dto, {new: true}).exec()
    }
}

export default UserService;
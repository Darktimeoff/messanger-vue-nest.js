import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectModel } from "@nestjs/mongoose";
import { genSalt, hash } from "bcrypt";
import { Model, Types } from "mongoose";
import { AddDialogDto } from "./dto/addDialog-user.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { RemoveDialogDto } from "./dto/removeDialog-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import {UserDocument} from './entities/user.entity';

@Injectable()
class UserService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<UserDocument>
    ) {

    }

    async create(dto: CreateUserDto) {
        const salt = await genSalt(10)

        const passwordHash = await hash(dto.password, salt);
        
        return this.userModel.create({
            ...dto,
            password: passwordHash
        });
    }

    async updateOnline(id: string, isOnline: boolean) {
        return this.userModel.findByIdAndUpdate(id, {
            isOnline,
            last_seen: new Date()
        }, {new: true}).exec()
    }

    async getUser(id: string) {
        return this.userModel.findById(id).exec()
    }

    async findByEmail(email: string) {
        return this.userModel.findOne({
            email
        }).exec()
    }

    async deleteUser(id: string) {
        return this.userModel.findByIdAndDelete(id).exec()
    }

    async updateUser(id: string, dto: UpdateUserDto) {
        return this.userModel.findByIdAndUpdate(id, dto, {new: true}).exec()
    }

    async addDialog(dto: AddDialogDto) {
        return this.userModel.findByIdAndUpdate(dto.userId, {
            $push: {
                dialog: dto.dialogId
            }
        }).exec();
    }

    async removeDialog(dto: RemoveDialogDto) {
        return this.userModel.findByIdAndUpdate(dto.userId, {
            $pull: {
                dialog: {
                    $in: dto.dialogId
                }
            }
        }).exec()
    }
}

export default UserService;
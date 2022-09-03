import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
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

    async addDialog(dto: AddDialogDto) {
        return this.userModel.findByIdAndUpdate(dto.userId, {
            $push: {
                dialog: dto.dialogId
            }
        });
    }

    async removeDialog(dto: RemoveDialogDto) {
        return this.userModel.findByIdAndUpdate(dto.userId, {
            $pull: {
                dialog: {
                    $in: dto.dialogId
                }
            }
        })
    }
}

export default UserService;
import { NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { CreateMessageDto } from "~/message/dto/create-message.dto";
import { MessageService } from "~/message/message.service";
import UserService from "~/user/user.service";
import { DIALOG_NOT_FOUND } from "./const";
import { CreateDialogDto } from "./dto/create-dialog.dto";
import { DialogDocument } from "./entities/dialog.entity";

export class DialogService {
    constructor(
        @InjectModel('Dialog') private readonly dialogModel: Model<DialogDocument>,
        private readonly userService: UserService,
        private readonly messageService: MessageService
    ) {

    }

    findAll(userId: string): Promise<DialogDocument[]> {
        console.log('user id',  new Types.ObjectId(userId))
        return this.dialogModel.find({
            members: {
                $elemMatch: {
                    $in: new Types.ObjectId(userId)
                }
            }
        }).populate(['members', 'lastMessage']).exec()
    }

    find(id: string) {
        return this.dialogModel.findById(id).populate('message').exec();
    }

    async create(dto: CreateDialogDto) {
        const dialog = await this.dialogModel.create({
            members: dto.membersId,
            isDialog: dto.isDialog,
        });

        dto.membersId.forEach(async (id) => {
            await this.userService.addDialog({
                userId: id,
                dialogId: dialog._id
            })
        })

        return dialog;
    }

    async addMessage(dialogId: string, messageDto: CreateMessageDto) {
        const message  = await this.messageService.create(messageDto);

        return this.dialogModel.findByIdAndUpdate(dialogId, {
            lastMessage: message._id,
            $push: {
                message: message._id
            }
        }).exec()
    }

    async deleteDialog(id: string) {
        const dialog = await this.find(id);

        if(!dialog) {
            throw new NotFoundException(DIALOG_NOT_FOUND)
        }

        dialog.message.forEach(async m => {
            await this.messageService.remove(m as any)
        });

        dialog.members.forEach(async m => {
            await this.userService.removeDialog({
                userId: m as any,
                dialogId: id
            })
        });

        return this.dialogModel.findByIdAndRemove(id).exec();
    }
}
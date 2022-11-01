import { NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, PopulateOptions, Types } from "mongoose";
import { CreateMessageDto } from "~/message/dto/create-message.dto";
import { MessageService } from "~/message/message.service";
import { User } from "~/user/entities/user.entity";
import UserService from "~/user/user.service";
import { DIALOG_NOT_FOUND } from "./const";
import { CreateDialogDto } from "./dto/create-dialog.dto";
import { Dialog, DialogDocument } from "./entities/dialog.entity";

export class DialogService {
    constructor(
        @InjectModel('Dialog') private readonly dialogModel: Model<DialogDocument>,
        private readonly userService: UserService,
        private readonly messageService: MessageService
    ) {

    }

    dialogWhereUserMember(dialogId: string | Types.ObjectId, userId: string | Types.ObjectId) {
        return this.dialogModel.findOne({
            _id: new Types.ObjectId(dialogId),
            members: {
                $elemMatch: {
                    $in: new Types.ObjectId(userId)
                }
            }
        }).exec();
    }

    async findUsers(userId: Types.ObjectId, text: string) {
        if(!text) {
            const ids = (await this.getAllIdUserWithDialogs(userId)).map(id => new Types.ObjectId(id));

            return this.userService.findUsers(ids);
        } else {
            return this.userService.findByText(userId, text)
        }
    }

    async getAllIdUserWithDialogs(userId: Types.ObjectId) {
        const dialogs = await this.dialogModel.find({
            members: {
                $elemMatch: {
                    $in: new Types.ObjectId(userId)
                }
            }
        }).select('members');

        return dialogs.flatMap<Types.ObjectId>(d => d.members as any[]).filter(id => id.toString() !== userId.toString());
    }

    async findAll(userId: string): Promise<DialogDocument[]> {
        return this.dialogModel.find({
            members: {
                $elemMatch: {
                    $in: new Types.ObjectId(userId)
                }
            }
        }).populate(['members', {
            path: 'lastMessage',
            populate: {
                strictPopulate: false,
                path: 'user'
            }
        }]).exec()
    }

    async find(id: string, populate: string | string[] = 'message') {
        return this.dialogModel.findById(id).populate(populate).exec();
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

        await this.dialogModel.findByIdAndUpdate(dialogId, {
            lastMessage: message._id,
            $push: {
                message: message._id
            }
        }).exec()

        return message;
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
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { AddMesageDialogDto } from "./dto/addMessage-dialog.dto";
import { CreateDialogDto } from "./dto/create-dialog.dto";
import { DialogDocument } from "./entities/dialog.entity";

export class DialogService {
    constructor(
        @InjectModel('Dialog') private readonly dialogModel: Model<DialogDocument>,
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
        return this.dialogModel.create({
            members: dto.membersId,
            isDialog: dto.isDialog,
        })
    }

    async addMessage(dto: AddMesageDialogDto) {
        return this.dialogModel.findByIdAndUpdate(dto.dialogId, {
            lastMessage: dto.messageId,
            $push: {
                message: dto.messageId
            }
        })
    }

    async deleteDialog(id: string) {
       return this.dialogModel.findByIdAndRemove(id);
    }
}
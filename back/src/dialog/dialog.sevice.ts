import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AddMesageDialogDto } from "./dto/addMessage-dialog.dto";
import { CreateDialogDto } from "./dto/create-dialog.dto";
import { DialogDocument } from "./entities/dialog.entity";

export class DialogService {
    constructor(
        @InjectModel('Dialog') private readonly dialogModel: Model<DialogDocument>,
    ) {

    }

    findAll(userId: string): Promise<DialogDocument[]> {
        return this.dialogModel.find({"members._id": userId}).exec()
    }

    find(id: string) {
        return this.dialogModel.findById(id);
    }

    async create(dto: CreateDialogDto) {
        return this.dialogModel.create({
            members: dto.membersId,
            isDialog: dto.isDialog,
        })
    }

    async addMessage(dto: AddMesageDialogDto) {
        return this.dialogModel.findByIdAndUpdate(dto.dialogId, {
            $push: {
                messsage: dto.messageId
            }
        })
    }
}
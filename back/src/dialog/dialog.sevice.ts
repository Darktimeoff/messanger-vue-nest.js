import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { DialogDocument } from "./entities/dialog.entity";

export class DialogService {
    constructor(
        @InjectModel('Dialog') private readonly dialogModel: Model<DialogDocument>
    ) {

    }
}
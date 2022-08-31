import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { DialogDocument } from "./dialog.model";

export class DialogService {
    constructor(
        @InjectModel('Dialog') private readonly dialogModel: Model<DialogDocument>
    ) {

    }
}
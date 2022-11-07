import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Types } from "mongoose";
import { Dialog } from "src/dialog/entities/dialog.entity";
import { User } from "src/user/entities/user.entity";
import { Image } from "~/image/entities/image.entity";

export type MessageDocument = Message & Document

@Schema({_id: true, id: true, timestamps: true})
export class Message {
    @Prop()
    text: string;

    @Prop()
    textEdited: string;
    
    @Prop({default: false})
    isRead: boolean;

    @Prop({type: Types.ObjectId, ref: "Image"})
    attachments: Image[]

    @Prop()
    audio: string;

    @Prop({type: Types.ObjectId, ref: 'User', required: true})
    author: User

    @Prop({type: Types.ObjectId, ref: 'Dialog', required: true})
    dialog: Dialog;
    
    @Prop()
    isDeleted: boolean;

    @Prop()
    deletedAt: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
MessageSchema.virtual('isEdited').get(function() {
    return Boolean(this.textEdited?.trim())
})
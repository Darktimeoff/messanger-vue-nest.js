import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { Types } from "mongoose";
import { Dialog } from "src/dialog/entities/dialog.entity";
import { User } from "src/user/entities/user.entity";

export type MessageDocument = Message & Document

@Schema({_id: true, id: true, timestamps: true})
export class Message {
    @Prop()
    text: string;
    
    @Prop()
    isRead: boolean;

    @Prop({type: [String]})
    attachments: string[]

    @Prop()
    audio: string;

    @Prop({type: Types.ObjectId, ref: 'User'})
    author: User

    @Prop({type: Types.ObjectId, ref: 'Dialog'})
    dialog: Dialog
}

export const MessageSchema = SchemaFactory.createForClass(Message);
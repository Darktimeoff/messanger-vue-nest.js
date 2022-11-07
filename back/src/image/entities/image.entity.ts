import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Dialog } from "~/dialog/entities/dialog.entity";
import { Message } from "~/message/entities/message.entity";
import { User } from "~/user/entities/user.entity";

export type ImageDocument = Image & Document;

@Schema({ timestamps: true, _id: true, id: true})
export class Image {
    @Prop({required: true})
    filename: string;

    @Prop()
    size: number;

    @Prop({required: true})
    orig_url: string;

    @Prop({required: true})
    webp_url: string

    @Prop({type: Types.ObjectId, ref: 'User', required: true}) 
    user: User;

    @Prop({type: Types.ObjectId, ref: "Message", required: true})
    message: Message;

    @Prop({type: Types.ObjectId, ref: 'Dialog'})
    dialog: Dialog;
}

export const ImageSchema = SchemaFactory.createForClass(Image);
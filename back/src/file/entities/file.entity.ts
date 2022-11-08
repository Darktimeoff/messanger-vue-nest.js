import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Exclude } from "class-transformer";
import { Types } from "mongoose";
import { Dialog } from "~/dialog/entities/dialog.entity";
import { Message } from "~/message/entities/message.entity";
import { User } from "~/user/entities/user.entity";

export type FileDocument = File & Document;

@Schema({ timestamps: true, _id: true, id: true})
export class File {
    @Prop({required: true})
    filename: string;

    @Exclude()
    @Prop()
    public_id: string;

    @Prop()
    width: number;

    @Prop()
    height: number;

    @Prop({required: true})
    size: number;

    @Prop({required: true})
    orig_url: string;

    @Prop()
    optimize_url: string

    @Prop({required: true})
    resource_type: string;

    @Prop({required: true})
    format: string;

    @Prop({type: Types.ObjectId, ref: 'User', required: true}) 
    user: User;

    @Prop({type: Types.ObjectId, ref: "Message"})
    message: Message;

    @Prop({type: Types.ObjectId, ref: 'Dialog'})
    dialog: Dialog;
}

export const FileSchema = SchemaFactory.createForClass(File);
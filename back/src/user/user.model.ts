import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import {Dialog} from 'src/dialog/dialog.model'

export type UserDocument = User & Document;


@Schema({ timestamps: true, _id: true, id: true})
export class User {
    @Prop({unique: true, required: true})
    email: string;
    
    @Prop({required: true})
    fullname: string;

    @Prop({unique: true})
    username: string;

    @Prop()
    avatar: string

    @Prop({required: true})
    password: string;

    @Prop({default: false})
    isOnline: boolean;

    @Prop({default: false}) 
    isConfirmed: boolean;

    @Prop({type: Date})
    last_seen: Date;

    @Prop({type: [{type: Types.ObjectId, ref: 'Dialog'}]}) 
    dialog: Dialog[]
}

export const UserSchema = SchemaFactory.createForClass(User);
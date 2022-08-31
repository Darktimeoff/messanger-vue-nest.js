import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import {Dialog} from 'src/dialog/dialog.model'

export type UserDocument = User & Document;


@Schema({ timestamps: true, _id: true, id: true})
export class User {
    @Prop({unique: true})
    email: string;
    
    @Prop()
    fullname: string;

    @Prop({unique: true})
    username: string;

    @Prop()
    avatar: string

    @Prop()
    password: string;

    @Prop()
    isOnline: boolean;

    @Prop() 
    isConfirmed: boolean;

    @Prop({type: Date})
    last_seen: Date;

    @Prop({type: [{type: Types.ObjectId, ref: 'Dialog'}]}) 
    dialog: Dialog[]
}

export const UserSchema = SchemaFactory.createForClass(User);
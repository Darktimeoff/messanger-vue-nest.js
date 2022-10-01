import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiHideProperty, ApiProperty, ApiTags } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';
import {Dialog} from 'src/dialog/entities/dialog.entity'

export type UserDocument = User & Document;

@Schema({ timestamps: true, _id: true, id: true})
export class User {
    @ApiProperty()
    @Prop({unique: true, required: true})
    email: string;

    @ApiProperty()
    @Prop({required: true})
    fullname: string;

    @ApiProperty()
    @Prop()
    username?: string;

    @ApiProperty()
    @Prop()
    avatar: string

    @ApiProperty()
    @Prop({required: true})
    password: string;

    @ApiProperty()
    @Prop({default: false})
    isOnline: boolean;

    @ApiHideProperty()
    @Prop({default: false}) 
    isConfirmed: boolean;

    @ApiProperty()
    @Prop({type: Date, default: new Date()})
    last_seen: Date;

    @ApiHideProperty()
    @Prop({type: [{type: Types.ObjectId, ref: 'Dialog'}]}) 
    dialog: Dialog[]
}

export type IUserId = User  & {_id: Types.ObjectId};
export type IUser = Omit<User, 'dialog' | 'isConfirmed'>

export const UserSchema = SchemaFactory.createForClass(User);
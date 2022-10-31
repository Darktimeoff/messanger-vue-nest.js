import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiHideProperty, ApiProperty, ApiTags } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
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

    @Exclude()
    @ApiProperty()
    @Prop({required: true})
    password: string;

    @ApiProperty()
    @Prop({default: false})
    isOnline: boolean;

    @Exclude()
    @ApiHideProperty()
    @Prop()
    confirm_hash: string;

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
UserSchema.index({
    username: 'text',
    fullname: 'text',
    email: 'text'
})
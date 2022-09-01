import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';
import { Message } from 'src/message/entities/message.entity';
import { User } from 'src/user/entities/user.entity';

export type DialogDocument = Dialog & Document;

@Schema({ timestamps: true, _id: true, id: true})
export class Dialog {
   @Prop({default: true})
   isDialog: boolean;

   @Prop({type: Types.ObjectId, ref: "Messsage"})
   lastMessage: Message[]

   @Prop({type: [{type: Types.ObjectId, ref: 'User'}]}) 
   members: User[]

   @Prop({type: [{type: Types.ObjectId, ref: 'Message'}]}) 
   messsage: Message[]
}

export const DialogSchema = SchemaFactory.createForClass(Dialog);
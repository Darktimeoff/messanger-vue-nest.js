import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Message } from '~/message/entities/message.entity';
import { User } from '~/user/entities/user.entity';

export type DialogDocument = Dialog & Document;

@Schema({ timestamps: true, _id: true, id: true})
export class Dialog {
   @Prop({default: true})
   isDialog: boolean;

   @Prop({type: Types.ObjectId, ref: "Message"})
   lastMessage: Message[]

   @Prop({type: [{type: Types.ObjectId, ref: 'User'}]}) 
   members: User[]

   @Prop({type: [{type: Types.ObjectId, ref: 'Message'}]}) 
   messsage: Message[]
}

export const DialogSchema = SchemaFactory.createForClass(Dialog);
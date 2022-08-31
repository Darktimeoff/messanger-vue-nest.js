import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/user/entities/user.entity';

export type DialogDocument = Dialog & Document;


@Schema({ timestamps: true, _id: true, id: true})
export class Dialog {
   @Prop({type: [{type: Types.ObjectId, ref: 'User'}]}) 
   user: User[]
}

export const DialogSchema = SchemaFactory.createForClass(Dialog);
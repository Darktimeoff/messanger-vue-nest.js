import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

export type ImageDocument = Image & Document;

@Schema({ timestamps: true, _id: true, id: true})
export class Image {

}

export const ImageSchema = SchemaFactory.createForClass(Image);
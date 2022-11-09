import { IsMongoId, IsString } from "class-validator";
import { isObjectIdOrHexString } from "mongoose";

export class CreateDto {
    @IsMongoId()
    id: string;
}
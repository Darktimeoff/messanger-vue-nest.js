import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsMongoId, IsOptional } from "class-validator";
import { CreateMessageDto } from "./../../message/dto/create-message.dto";


export class CreateDialogDto {
    @IsArray()
    @IsMongoId({ each: true })
    membersId: string[]

    @IsBoolean()
    isDialog: boolean;

    @IsOptional()
    @Type(() => CreateMessageDto)
    message?: CreateMessageDto
}
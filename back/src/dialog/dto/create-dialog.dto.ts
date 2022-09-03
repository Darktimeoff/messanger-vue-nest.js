import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsString } from "class-validator";
import { CreateMessageDto } from "./../../message/dto/create-message.dto";


export class CreateDialogDto {
    @IsString()
    userId: string;

    @IsArray()
    @IsString({ each: true })
    membersId: string[]

    @IsBoolean()
    isDialog: boolean;

    @Type(() => CreateMessageDto)
    message: CreateMessageDto
}
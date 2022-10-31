import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsOptional, IsString } from "class-validator";
import { CreateMessageDto } from "./../../message/dto/create-message.dto";


export class CreateDialogDto {
    @IsArray()
    @IsString({ each: true })
    membersId: string[]

    @IsBoolean()
    isDialog: boolean;

    @IsOptional()
    @Type(() => CreateMessageDto)
    message?: CreateMessageDto
}
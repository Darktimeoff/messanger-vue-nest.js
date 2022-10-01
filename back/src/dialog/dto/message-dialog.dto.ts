import { Type } from "class-transformer";
import { IsArray, IsOptional, IsString } from "class-validator";
import { CreateMessageDto } from "~/message/dto/create-message.dto";

export class MessageDialogDto {
    @IsString()
    dialogId: string;

    @Type(() => CreateMessageDto)
    message: CreateMessageDto;
}
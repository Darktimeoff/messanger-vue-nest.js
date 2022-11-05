import { IsOptional, IsString } from "class-validator";

export class ReadMessageDto {
    @IsString()
    dialogId: string;

    @IsOptional()
    @IsString()
    messageId?: string;
}
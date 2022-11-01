import { IsString } from "class-validator";

export class MessageDeleteDto {
    @IsString()
    dialogId: string;

    @IsString()
    messageId: string;
}
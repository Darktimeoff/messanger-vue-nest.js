import { IsMongoId } from "class-validator";

export class MessageDeleteDto {
    @IsMongoId()
    dialogId: string;

    @IsMongoId()
    messageId: string;
}
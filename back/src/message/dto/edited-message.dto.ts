import { IsString } from "class-validator";

export class EditedMessageDto {
    @IsString()
    messageId: string;

    @IsString()
    text: string;
}

export class EditedDialogMessageDto extends EditedMessageDto {
    @IsString()
    dialogId: string;
}
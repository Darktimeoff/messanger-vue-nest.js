import { IsMongoId, IsString } from "class-validator";

export class EditedMessageDto {
    @IsMongoId()
    messageId: string;

    @IsString()
    text: string;
}

export class EditedDialogMessageDto extends EditedMessageDto {
    @IsMongoId()
    dialogId: string;
}
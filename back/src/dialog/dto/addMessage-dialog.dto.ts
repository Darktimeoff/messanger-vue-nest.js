import { IsString } from "class-validator";

export class AddMesageDialogDto {
    @IsString()
    messageId: string;

    @IsString()
    dialogId: string;
}
import { IsString } from "class-validator";

export class RemoveDialogDto {
    @IsString()
    userId: string;

    @IsString()
    dialogId: string;
}
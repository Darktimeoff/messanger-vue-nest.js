import { IsString } from "class-validator";

export class AddDialogDto {
    @IsString()
    userId: string;

    @IsString()
    dialogId: string;
}
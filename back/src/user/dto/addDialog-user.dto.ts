import { IsMongoId } from "class-validator";

export class AddDialogDto {
    @IsMongoId()
    userId: string;

    @IsMongoId()
    dialogId: string;
}
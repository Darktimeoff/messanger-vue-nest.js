import { IsString, IsMongoId } from "class-validator";

export class RemoveDialogDto {
    @IsMongoId()
    userId: string;

    @IsMongoId()
    dialogId: string;
}
import { IsMongoId, IsOptional, IsString } from "class-validator";

export class CreateMessageDto {
    @IsString()
    text: string;

    @IsOptional()
    @IsMongoId()
    authorId?: string;

    @IsOptional()
    @IsMongoId()
    dialogId: string;
}

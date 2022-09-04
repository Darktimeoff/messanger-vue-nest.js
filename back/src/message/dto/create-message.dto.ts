import { IsOptional, IsString } from "class-validator";

export class CreateMessageDto {
    @IsString()
    text: string;

    @IsOptional()
    @IsString()
    authorId?: string;

    @IsString()
    @IsOptional()
    dialogId: string;
}

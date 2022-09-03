import { IsOptional, IsString } from "class-validator";

export class CreateMessageDto {
    @IsString()
    text: string;

    @IsString()
    authorId: string;

    @IsString()
    @IsOptional()
    dialogId: string;
}

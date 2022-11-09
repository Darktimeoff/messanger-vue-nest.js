import { IsMongoId, IsOptional } from "class-validator";

export class ReadMessageDto {
    @IsMongoId()
    dialogId: string;

    @IsOptional()
    @IsMongoId()
    messageId?: string;
}
import { IsMongoId, IsOptional } from "class-validator";

export class LinkAttachmentDto {
    @IsMongoId()
    @IsOptional()
    dialogId?: string;

    @IsMongoId()
    messageId: string;

    @IsMongoId()
    attachmentId: string;
}
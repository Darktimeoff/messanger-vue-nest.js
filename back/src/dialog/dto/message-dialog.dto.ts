import { Type } from "class-transformer";
import { IsMongoId} from "class-validator";
import { CreateMessageDto } from "~/message/dto/create-message.dto";

export class MessageDialogDto {
    @IsMongoId()
    dialogId: string;

    @Type(() => CreateMessageDto)
    message: CreateMessageDto;
}
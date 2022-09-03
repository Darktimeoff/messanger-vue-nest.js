import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiCreatedResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateMessageDto } from "./../message/dto/create-message.dto";
import { MessageService } from "./../message/message.service";
import UserService from "./../user/user.service";
import { IdValidationPipe } from "./../pipe/id-validation.pipe";
import { DialogService } from "./dialog.sevice";
import { CreateDialogDto } from "./dto/create-dialog.dto";
import { Dialog } from "./entities/dialog.entity";

@ApiTags('dialog')
@Controller('dialog')
export class DialogController {
    constructor(
        private readonly dialogService: DialogService,
        private readonly messageService: MessageService,
        private readonly userService: UserService
    ) {

    }

    @ApiCreatedResponse({
        description: "Create Dialog for user",
        type: Dialog
    })
    @Post()
    async create(@Body() dto: CreateDialogDto) {
        const dialog = await this.dialogService.create(dto);

        const messageDto: CreateMessageDto = {
            ...dto.message,
            dialogId: dialog._id
        }

        const message = await this.messageService.create(messageDto);

        await this.dialogService.addMessage({
            messageId: message._id as any,
            dialogId: dialog._id
        })

        dto.membersId.forEach(async (id) => {
            await this.userService.addDialog({
                userId: id,
                dialogId: dialog._id
            })
        })

        return dialog
    }


    @ApiResponse({
        description: 'Get list of user dialog',
        type: [Dialog]
    })
    @Get(':id')
    async findAll(@Param('id', IdValidationPipe) userId: string) {
        const dialogs = await this.dialogService.findAll(userId);
        return dialogs;
    }
}
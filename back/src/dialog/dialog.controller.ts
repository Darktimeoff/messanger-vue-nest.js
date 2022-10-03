import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Query, UseGuards, Request, BadRequestException, ForbiddenException } from "@nestjs/common";
import { ApiBadRequestResponse, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { CreateMessageDto } from "./../message/dto/create-message.dto";
import { MessageService } from "./../message/message.service";
import UserService from "./../user/user.service";
import { IdValidationPipe } from "./../pipe/id-validation.pipe";
import { DialogService } from "./dialog.sevice";
import { CreateDialogDto } from "./dto/create-dialog.dto";
import { Dialog } from "./entities/dialog.entity";
import { DIALOG_CANT_DELETE, DIALOG_CREATE_ERROR, DIALOG_NOT_FOUND } from "./const";
import { ID_VALIDATION_ERROR } from "~/pipe/id-validation.contstants";
import { Message } from "~/message/entities/message.entity";
import { JwtAuthGuard } from "~/auth/guard/jwt-auth.guard";
import {  IReqAuth } from "~/auth/interface/jwt.interface";
import { USER_NOT_FOUND } from "~/user/const";
import { FailedRequestResponse, TypesFailedResponse } from "~/types";
import { DialogGateway } from "./dialog.gateway";

@UseGuards(JwtAuthGuard)
@ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: FailedRequestResponse
})
@ApiNotFoundResponse({
    description: USER_NOT_FOUND,
    type: FailedRequestResponse
})
@ApiTags('dialog')
@Controller('dialog')
export class DialogController {
    constructor(
        private readonly dialogService: DialogService,
        private readonly dialogGateway: DialogGateway
    ) {

    }

    @ApiCreatedResponse({
        description: "Create Dialog for user",
        type: Dialog
    })
    @ApiBadRequestResponse({
        description: "Failed body date validation",
        type: TypesFailedResponse
    })
    @Post()
    async create(@Body() dto: CreateDialogDto, @Request() req: IReqAuth) {
        const dialog = await this.dialogService.create(dto);

        const messageDto: CreateMessageDto = {
            ...dto.message,
            dialogId: dialog._id,
            authorId: req.user._id as any
        }

        await this.dialogService.addMessage(dialog._id, messageDto);

        const dialogActual = await this.dialogService.find(dialog._id);
        
        if(!dialogActual) throw new BadRequestException(DIALOG_CREATE_ERROR);

        this.dialogGateway.dialogsEmit(dialogActual);

        return dialog;
    }


    @ApiResponse({
        description: 'Get list of user dialog',
        type: [Dialog]
    })
    @Get('')
    async findAll(@Request() req: IReqAuth) {
        const dialogs = await this.dialogService.findAll(req.user._id as any);
        return dialogs;
    }

    @ApiResponse({
        description: 'Get dialog',
        type: [Message]
    })
    @ApiBadRequestResponse({
        description: ID_VALIDATION_ERROR
    })
    @ApiNotFoundResponse({
        description: 'DIALOG_NOT_FOUND'
    })
    @Get(':id')
    async find(@Param('id', IdValidationPipe) dialogId: string) {
        const dialog = await this.dialogService.find(dialogId);

        if(!dialog) {
            throw new NotFoundException(DIALOG_NOT_FOUND)
        }

        return dialog;
    }

    @ApiOkResponse({
        description: "Deleate dialog",
    })
    @ApiNotFoundResponse({
        description: DIALOG_NOT_FOUND
    })
    @ApiBadRequestResponse({
        description: ID_VALIDATION_ERROR
    })
    @ApiForbiddenResponse({
        description: DIALOG_CANT_DELETE
    })
    @Delete(':id')
    async deleteDialog(
        @Request() req: IReqAuth,
        @Param('id', IdValidationPipe) dialogId: string
    ) {
        const isUserMembers = Boolean(await this.dialogService.dialogWhereUserMember(dialogId, req.user._id));

        if(!isUserMembers) throw new ForbiddenException(DIALOG_CANT_DELETE)

        await this.dialogService.deleteDialog(dialogId);
        return;
    }
}
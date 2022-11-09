import { Body, Controller, Delete, Post, Request, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '~/auth/guard/jwt-auth.guard';
import { IReqAuth } from '~/auth/interface/jwt.interface';
import { CloudinaryService } from '~/cloudinary/cloudinary.service';
import { UploadFiles } from '~/decorators/files.decorator';
import { User } from '~/decorators/user-email.decorator';
import { IUser } from '~/user/entities/user.entity';
import { CreateDto } from './dto/create.dto';
import { FileService } from './file.service';

@UseGuards(JwtAuthGuard)
@Controller('file')
export class FileController {
    constructor(
       private readonly fileService: FileService
    ) {

    }

    @UseInterceptors(FileInterceptor('file'))
    @Post()
    async create(
        @Body() data: CreateDto,
        @User() user: IUser,
        @UploadFiles() file: Express.Multer.File
    ) {
        const userId = user._id;
        const fileDoc = await this.fileService.uploadFile(userId, file, data);

        return fileDoc
    }

    @Delete()
    async delete() {

    }
}

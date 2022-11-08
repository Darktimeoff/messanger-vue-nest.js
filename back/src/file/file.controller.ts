import { Controller, Delete, Post, Request, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '~/auth/guard/jwt-auth.guard';
import { IReqAuth } from '~/auth/interface/jwt.interface';
import { CloudinaryService } from '~/cloudinary/cloudinary.service';
import { UploadFiles } from '~/decorators/files.decorator';
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
        @Request() req: IReqAuth,
        @UploadFiles() file: Express.Multer.File
    ) {
        const userId = req.user._id;
        const fileDoc = await this.fileService.uploadFile(userId, file);

        return fileDoc
    }

    @Delete()
    async delete() {

    }
}

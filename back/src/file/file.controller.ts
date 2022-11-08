import { Controller, Delete, Post, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '~/auth/guard/jwt-auth.guard';
import { CloudinaryService } from '~/cloudinary/cloudinary.service';
import { UploadFiles } from '~/decorators/files.decorator';

@UseGuards(JwtAuthGuard)
@Controller('file')
export class FileController {
    constructor(
        private readonly cloudinaryService: CloudinaryService
    ) {

    }

    @UseInterceptors(FileInterceptor('file'))
    @Post()
    async create(@UploadFiles() file: Express.Multer.File) {
        const resp = await this.cloudinaryService.uploadImage(file);
        console.log('upload file', resp);
    }

    @Delete()
    async delete() {

    }
}

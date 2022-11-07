import { Controller, Delete, Post, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '~/auth/guard/jwt-auth.guard';
import { UploadFiles } from '~/decorators/files.decorator';

@UseGuards(JwtAuthGuard)
@Controller('image')
export class ImageController {
    @UseInterceptors(FileInterceptor('file', {
        dest: 'uploads/',
    }))
    @Post()
    async create(@UploadFiles() file: Express.Multer.File) {
        console.log(file);
    }

    @Delete()
    async delete() {

    }
}

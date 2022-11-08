import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FileSchema } from './entities/file.entity';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { CloudinaryModule } from '~/cloudinary/cloudinary.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
          name: 'File',
          schema: FileSchema
      }
    ]),
    CloudinaryModule
  ],
  providers: [FileService],
  controllers: [FileController]
})
export class FileModule {
}

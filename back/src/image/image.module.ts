import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageSchema } from './entities/image.entity';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
          name: 'Image',
          schema: ImageSchema
      }
    ])
  ],
  providers: [ImageService],
  controllers: [ImageController]
})
export class ImageModule {
}

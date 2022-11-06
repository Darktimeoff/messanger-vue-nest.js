import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageSchema } from './entities/image.entity';
import { ImageService } from './image.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
          name: 'Image',
          schema: ImageSchema
      }
    ])
  ],
  providers: [ImageService]
})
export class ImageModule {
}

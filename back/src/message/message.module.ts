import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageSchema } from './entities/message.entity';
import { FileModule } from '~/file/file.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Message',
        schema: MessageSchema
      }
    ]),
    FileModule
  ],
  providers: [MessageService],
  exports: [MessageService]
})
export class MessageModule {}

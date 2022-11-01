import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageSchema } from './entities/message.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Message',
        schema: MessageSchema
      }
    ])
  ],
  providers: [MessageService],
  exports: [MessageService]
})
export class MessageModule {}

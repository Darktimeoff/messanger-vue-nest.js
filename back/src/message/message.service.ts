import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateMessageDto } from './dto/create-message.dto';
import { EditedMessageDto } from './dto/edited-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MessageDocument } from './entities/message.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel('Message') private readonly messageModel: Model<MessageDocument>
  ) {

  }

  create(dto: CreateMessageDto) {
    return this.messageModel.create({
      text: dto.text,
      author: new Types.ObjectId(dto.authorId),
      dialog: dto.dialogId
    })
  }

  findAll() {
    return `This action returns all message`;
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  async edited(id: string, dto: EditedMessageDto) {
    return this.messageModel.findByIdAndUpdate(id, {
      textEdited: dto.text
    }, {new: true}).exec()
  }

  async readOneMessage(messageId: string) {
    return this.messageModel.findByIdAndUpdate(messageId, {
      isRead: true
    })
  }

  async readUserDialogMessage(userId: string, dialogId: string) {
    return this.messageModel.updateMany({
      dialog: new Types.ObjectId(dialogId),
      author: new Types.ObjectId(userId),
      isRead: false
    }, {
      isRead: true
    }, {
      new: true,
      sort: {
        createdAt: 1
      }
    }).exec()
  } 

  async remove(id: string) {
    return this.messageModel.findByIdAndUpdate(id, {
      deletedAt: new Date().toISOString(),
      isDeleted: true
    }, {new: true}).exec()
  }
}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import UserController from './user.controller';
import { UserSchema } from './entities/user.entity';
import UserService from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema
      }
    ])
  ],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}

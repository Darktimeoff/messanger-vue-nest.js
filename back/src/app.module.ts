import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoConfig } from './config/mongo.config';
import { UserModule } from './user/user.module';
import { DialogModule } from './dialog/dialog.module';
import { MessageModule } from './message/message.module';
import { AuthModule } from './auth/auth.module';
import { FileModule } from './file/file.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getMongoConfig,
      inject: [ConfigService],
    }),
    UserModule,
    DialogModule,
    MessageModule,
    AuthModule,
    FileModule,
    CloudinaryModule
  ]
})
export class AppModule { }

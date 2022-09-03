import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DialogController } from "./dialog.controller";
import { DialogSchema } from "./entities/dialog.entity";
import { DialogService } from "./dialog.sevice";
import { MessageModule } from "~/message/message.module";
import { UserModule } from "~/user/user.module";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'Dialog',
                schema: DialogSchema
            }
        ]),
        MessageModule,
        UserModule
    ],
    providers: [DialogService],
    controllers: [DialogController],
})
export class DialogModule {}
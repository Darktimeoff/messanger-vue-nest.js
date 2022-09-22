import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DialogController } from "./dialog.controller";
import { DialogSchema } from "./entities/dialog.entity";
import { DialogService } from "./dialog.sevice";
import { MessageModule } from "~/message/message.module";
import { UserModule } from "~/user/user.module";
import { DialogGateway } from "./dialog.gateway";
import { UtilsModule } from "~/utils/utils.module";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'Dialog',
                schema: DialogSchema
            }
        ]),
        MessageModule,
        UserModule,
        UtilsModule
    ],
    providers: [DialogService, DialogGateway],
    controllers: [DialogController],
})
export class DialogModule {}
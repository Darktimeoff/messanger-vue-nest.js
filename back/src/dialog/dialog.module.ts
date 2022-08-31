import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DialogController } from "./dialog.controller";
import { DialogSchema } from "./dialog.model";
import { DialogService } from "./dialog.sevice";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'Dialog',
                schema: DialogSchema
            }
        ])
    ],
    providers: [DialogService],
    controllers: [DialogController],
})
export class DialogModule {}
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DialogController } from "./dialog.controller";
import { DialogSchema } from "./entities/dialog.entity";
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
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "~/user/user.module";
import { AuthUtils } from "./auth.utils";

@Module({
    imports: [
        ConfigModule,
        JwtModule,
        UserModule
    ],
    providers: [AuthUtils],
    exports: [AuthUtils]
})
export class UtilsModule {}
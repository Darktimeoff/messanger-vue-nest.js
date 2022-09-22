import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { JWT_SECRET } from "~/auth/const";
import { IJWTPayload } from "~/auth/interface/jwt.interface";
import { USER_NOT_FOUND } from "~/user/const";
import UserService from "~/user/user.service";

@Injectable()
export class AuthUtils {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly userService: UserService
    ) {
    }

    async validate(token: string) {
        const secret = this.configService.get<string>(JWT_SECRET);
        const jwtPayload = await this.jwtService.verifyAsync<IJWTPayload>(token, {secret});
        const user = (await this.userService.getUser(jwtPayload.sub))?.toObject();

        if(!user) {
            throw new Error(USER_NOT_FOUND);
        }

        return user;
    }
}
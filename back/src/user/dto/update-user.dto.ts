import { IUser } from "../entities/user.entity";
import {
    IsBoolean,
    IsDate,
    IsOptional,
    IsString,
} from 'class-validator';
import { ApiPropertyOptional } from "@nestjs/swagger";


export class UpdateUserDto implements Partial<Omit<IUser, 'password' | 'email'>>  {
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    fullname: string;
    
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    avatar: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    username: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsBoolean()
    isOnline: boolean

    @ApiPropertyOptional()
    @IsOptional()
    @IsDate()
    last_seen: Date
}
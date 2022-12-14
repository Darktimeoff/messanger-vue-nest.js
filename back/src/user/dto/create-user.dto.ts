import {
  IsEmail,
  IsString,
  IsMongoId
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsString()
  email: string;
  
  @IsString()
  fullname: string;

  @IsString()
  password: string;
}
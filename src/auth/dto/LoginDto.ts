import {
  IsString,
  MaxLength,
  IsNotEmpty,
  MinLength,
  IsEmail,
} from 'class-validator';
import { Transform } from 'class-transformer';
export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(30)
  email: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(6)
  @MaxLength(30)
  password: string;
}

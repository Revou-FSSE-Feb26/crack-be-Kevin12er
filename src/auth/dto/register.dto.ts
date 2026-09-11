import { IsEmail, IsNotEmpty, IsOptional, IsEnum, IsString } from 'class-validator';
import { Role } from '@prisma/client'; // Import enum Role dari Prisma

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsOptional()
  @IsEnum(Role) 
  role?: Role;
}
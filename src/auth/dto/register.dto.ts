import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Role } from '@prisma/client';

export class RegisterDto {
  @ApiProperty({ example: 'Siswa Baru', description: 'Nama lengkap pengguna' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'siswa@example.com', description: 'Alamat email pengguna' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'password123', description: 'Kata sandi minimal 6 karakter', minLength: 6 })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ enum: Role, example: Role.STUDENT, description: 'Role pengguna (STUDENT atau INSTRUCTOR)' })
  @IsEnum(Role)
  role: Role;
}
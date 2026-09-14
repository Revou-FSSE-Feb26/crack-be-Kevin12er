import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'siswa@example.com', description: 'Email terdaftar' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'password123', description: 'Kata sandi akun' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
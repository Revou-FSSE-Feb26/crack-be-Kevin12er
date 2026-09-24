import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class CreateQuizDto {
  @ApiProperty({
    example: 'c8f45844-6a5e-4f4a-bf62-e9ae89f9c719',
    description: 'ID course tempat quiz ini berada',
  })
  @IsString()
  @IsNotEmpty()
  courseId: string;

  @ApiProperty({
    example: 'Quiz NestJS Fundamental',
    description: 'Judul quiz',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'Quiz untuk evaluasi pemahaman dasar NestJS',
    description: 'Deskripsi quiz',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: 30,
    description: 'Batas waktu quiz dalam menit (Wajib diisi)',
  })
  @IsInt()
  @Min(1, { message: 'Batas waktu minimal 1 menit' })
  @IsNotEmpty({ message: 'Batas waktu (timeLimit) wajib diisi' })
  timeLimit: number;
}
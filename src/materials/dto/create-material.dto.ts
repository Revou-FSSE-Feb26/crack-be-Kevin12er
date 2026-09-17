import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class CreateMaterialDto {
  @ApiProperty({
    example: 'c8f45844-6a5e-4f4a-bf62-e9ae89f9c719',
    description: 'ID course tempat materi ini berada',
  })
  @IsString()
  @IsNotEmpty()
  courseId: string;

  @ApiProperty({
    example: 'Pengenalan NestJS',
    description: 'Judul materi pembelajaran',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example:
      'Pada materi ini kita akan membahas struktur dasar project NestJS.',
    description: 'Konten materi',
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    example: 1,
    description: 'Urutan materi dalam satu course',
    required: false,
    default: 0,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEnrollmentDto {
  @ApiProperty({ example: 'clx123abc456def789', description: 'ID dari course yang ingin didaftari' })
  @IsString()
  @IsNotEmpty()
  courseId: string;
}
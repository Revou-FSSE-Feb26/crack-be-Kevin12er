import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateQuizAttemptDto {
  @ApiProperty({
    example: 'a4be73f3-4f9e-43d8-8f51-a58406e4db53',
    description: 'ID quiz yang akan dikerjakan siswa',
  })
  @IsString()
  @IsNotEmpty()
  quizId: string;
}

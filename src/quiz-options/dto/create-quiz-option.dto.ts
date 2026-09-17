import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateQuizOptionDto {
  @ApiProperty({
    example: 'b4c8819f-a524-435e-8868-950b37608581',
    description: 'ID quiz question untuk opsi ini',
  })
  @IsString()
  @IsNotEmpty()
  questionId: string;

  @ApiProperty({
    example: 'Provider',
    description: 'Teks opsi jawaban',
  })
  @IsString()
  @IsNotEmpty()
  optionText: string;

  @ApiProperty({
    example: true,
    description: 'Penanda opsi benar atau tidak',
  })
  @IsBoolean()
  isCorrect: boolean;
}

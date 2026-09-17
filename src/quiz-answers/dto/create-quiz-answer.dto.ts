import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateQuizAnswerDto {
  @ApiProperty({
    example: 'f74c7607-6763-481d-b8a2-2f668c02387f',
    description: 'ID attempt quiz milik student',
  })
  @IsString()
  @IsNotEmpty()
  attemptId: string;

  @ApiProperty({
    example: 'b4c8819f-a524-435e-8868-950b37608581',
    description: 'ID pertanyaan quiz yang dijawab',
  })
  @IsString()
  @IsNotEmpty()
  questionId: string;

  @ApiProperty({
    example: 'Provider',
    description: 'Jawaban teks (untuk essay atau fallback)',
    required: false,
  })
  @IsOptional()
  @IsString()
  answerText?: string;

  @ApiProperty({
    example: 'd312dc89-b57a-4fc0-ae57-ad80bf98d069',
    description: 'ID opsi jawaban terpilih (untuk multiple choice)',
    required: false,
  })
  @IsOptional()
  @IsString()
  selectedOptionId?: string;
}

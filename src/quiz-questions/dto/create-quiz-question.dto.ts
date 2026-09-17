import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum QuizQuestionType {
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  ESSAY = 'ESSAY',
}

export class CreateQuizQuestionDto {
  @ApiProperty({
    example: 'bd668a40-3ef5-47f5-981e-2726418bad86',
    description: 'ID quiz tempat soal ini berada',
  })
  @IsString()
  @IsNotEmpty()
  quizId: string;

  @ApiProperty({
    example: 'Manakah yang termasuk dependency injection di NestJS?',
    description: 'Teks pertanyaan',
  })
  @IsString()
  @IsNotEmpty()
  question: string;

  @ApiProperty({
    enum: QuizQuestionType,
    example: QuizQuestionType.MULTIPLE_CHOICE,
    description: 'Tipe soal: MULTIPLE_CHOICE atau ESSAY',
  })
  @IsEnum(QuizQuestionType)
  type: QuizQuestionType;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class AnswerItemDto {
  @ApiProperty({ description: 'ID Pertanyaan' })
  @IsString()
  @IsNotEmpty()
  questionId: string;

  @ApiProperty({ description: 'ID Opsi Jawaban yang dipilih' })
  @IsString()
  @IsOptional()
  selectedOptionId?: string;

  @ApiProperty({ description: 'Jawaban teks (jika essay)' })
  @IsString()
  @IsOptional()
  answerText?: string;
}

export class CreateQuizAttemptDto {
  @ApiProperty({
    example: 'a4be73f3-4f9e-43d8-8f51-a58406e4db53',
    description: 'ID quiz yang akan dikerjakan siswa',
  })
  @IsString()
  @IsNotEmpty()
  quizId: string;

  @ApiProperty({
    type: [AnswerItemDto],
    description: 'Daftar jawaban siswa',
    required: false,
  })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => AnswerItemDto)
  answers?: AnswerItemDto[];
}
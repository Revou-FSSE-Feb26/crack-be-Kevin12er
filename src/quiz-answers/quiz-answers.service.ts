import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuizAnswerDto } from './dto/create-quiz-answer.dto';

@Injectable()
export class QuizAnswersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createQuizAnswerDto: CreateQuizAnswerDto, studentId: string) {
    const prismaClient = this.prisma as unknown as Record<string, any>;

    const attempt = await prismaClient['quizAttempt'].findUnique({
      where: { id: createQuizAnswerDto.attemptId },
      select: { id: true, studentId: true, quizId: true, status: true },
    });

    if (!attempt) {
      throw new NotFoundException('Quiz attempt tidak ditemukan');
    }

    if (attempt.studentId !== studentId) {
      throw new ForbiddenException('Anda tidak boleh mengisi jawaban attempt milik user lain');
    }

    const question = await prismaClient['quizQuestion'].findUnique({
      where: { id: createQuizAnswerDto.questionId },
      select: { id: true, quizId: true, type: true },
    });

    if (!question) {
      throw new NotFoundException('Quiz question tidak ditemukan');
    }

    if (question.quizId !== attempt.quizId) {
      throw new BadRequestException('Question tidak termasuk dalam quiz attempt ini');
    }

    let computedIsCorrect: boolean | null = null;

    if (question.type === 'MULTIPLE_CHOICE') {
      if (!createQuizAnswerDto.selectedOptionId) {
        throw new BadRequestException('selectedOptionId wajib diisi untuk soal MULTIPLE_CHOICE');
      }

      const selectedOption = await prismaClient['quizOption'].findUnique({
        where: { id: createQuizAnswerDto.selectedOptionId },
        select: { id: true, questionId: true, isCorrect: true },
      });

      if (!selectedOption) {
        throw new NotFoundException('Quiz option tidak ditemukan');
      }

      if (selectedOption.questionId !== question.id) {
        throw new BadRequestException('selectedOptionId tidak valid untuk question ini');
      }

      computedIsCorrect = Boolean(selectedOption.isCorrect);
    }

    if (question.type === 'ESSAY' && !createQuizAnswerDto.answerText) {
      throw new BadRequestException('answerText wajib diisi untuk soal ESSAY');
    }

    return prismaClient['quizAnswer'].upsert({
      where: {
        attemptId_questionId: {
          attemptId: createQuizAnswerDto.attemptId,
          questionId: createQuizAnswerDto.questionId,
        },
      },
      update: {
        answerText: createQuizAnswerDto.answerText,
        selectedOptionId: createQuizAnswerDto.selectedOptionId,
        isCorrect: computedIsCorrect,
      },
      create: {
        attemptId: createQuizAnswerDto.attemptId,
        questionId: createQuizAnswerDto.questionId,
        answerText: createQuizAnswerDto.answerText,
        selectedOptionId: createQuizAnswerDto.selectedOptionId,
        isCorrect: computedIsCorrect,
      },
      include: {
        question: {
          select: {
            id: true,
            type: true,
            question: true,
          },
        },
      },
    });
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuizOptionDto } from './dto/create-quiz-option.dto';

@Injectable()
export class QuizOptionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createQuizOptionDto: CreateQuizOptionDto) {
    const prismaClient = this.prisma as unknown as Record<string, any>;

    const question = await prismaClient['quizQuestion'].findUnique({
      where: { id: createQuizOptionDto.questionId },
      select: { id: true, question: true, quizId: true },
    });

    if (!question) {
      throw new NotFoundException('Quiz question tidak ditemukan');
    }

    return prismaClient['quizOption'].create({
      data: {
        questionId: createQuizOptionDto.questionId,
        optionText: createQuizOptionDto.optionText,
        isCorrect: createQuizOptionDto.isCorrect,
      },
      include: {
        question: {
          select: {
            id: true,
            question: true,
            type: true,
          },
        },
      },
    });
  }

  async findByQuestionId(questionId: string) {
    const prismaClient = this.prisma as unknown as Record<string, any>;

    return prismaClient['quizOption'].findMany({
      where: { questionId },
      include: {
        question: {
          select: {
            id: true,
            question: true,
            type: true,
          },
        },
      },
      orderBy: [{ createdAt: 'asc' }],
    });
  }
}

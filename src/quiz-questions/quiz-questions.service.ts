import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuizQuestionDto } from './dto/create-quiz-question.dto';

@Injectable()
export class QuizQuestionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createQuizQuestionDto: CreateQuizQuestionDto) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id: createQuizQuestionDto.quizId },
      select: { id: true, title: true },
    });

    if (!quiz) {
      throw new NotFoundException('Quiz tidak ditemukan');
    }

    const prismaClient = this.prisma as unknown as Record<string, any>;

    return prismaClient['quizQuestion'].create({
      data: {
        quizId: createQuizQuestionDto.quizId,
        question: createQuizQuestionDto.question,
        type: createQuizQuestionDto.type,
      },
      include: {
        quiz: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });
  }

  async findByQuizId(quizId: string) {
    const prismaClient = this.prisma as unknown as Record<string, any>;

    return prismaClient['quizQuestion'].findMany({
      where: { quizId },
      include: {
        quiz: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      orderBy: [{ createdAt: 'asc' }],
    });
  }
}

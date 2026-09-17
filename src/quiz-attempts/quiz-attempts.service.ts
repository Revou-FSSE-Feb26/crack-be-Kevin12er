import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuizAttemptDto } from './dto/create-quiz-attempt.dto';

@Injectable()
export class QuizAttemptsService {
  constructor(private readonly prisma: PrismaService) {}

  async findMyAttempts(studentId: string) {
    const prismaClient = this.prisma as unknown as Record<string, any>;

    return prismaClient['quizAttempt'].findMany({
      where: { studentId },
      include: {
        quiz: {
          select: {
            id: true,
            title: true,
            courseId: true,
            course: {
              select: {
                id: true,
                title: true,
              },
            },
          },
        },
      },
      orderBy: [{ createdAt: 'desc' }],
    });
  }

  async create(createQuizAttemptDto: CreateQuizAttemptDto, studentId: string) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id: createQuizAttemptDto.quizId },
      select: { id: true, courseId: true, title: true },
    });

    if (!quiz) {
      throw new NotFoundException('Quiz tidak ditemukan');
    }

    const enrollment = await this.prisma.enrollment.findUnique({
      where: {
        studentId_courseId: {
          studentId,
          courseId: quiz.courseId,
        },
      },
      select: { id: true },
    });

    if (!enrollment) {
      throw new ForbiddenException('Anda belum terdaftar pada course quiz ini');
    }

    const prismaClient = this.prisma as unknown as Record<string, any>;

    return prismaClient['quizAttempt'].create({
      data: {
        quizId: quiz.id,
        studentId,
      },
      include: {
        quiz: {
          select: {
            id: true,
            title: true,
            courseId: true,
          },
        },
        student: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }
}

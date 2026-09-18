import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuizAnswerDto } from './dto/create-quiz-answer.dto';

@Injectable()
export class QuizAnswersService {
  constructor(private readonly prisma: PrismaService) {}

  async findByAttemptId(attemptId: string, userId: string, role: Role) {
    const prismaClient = this.prisma as unknown as Record<string, any>;

    const attempt = await prismaClient['quizAttempt'].findUnique({
      where: { id: attemptId },
      select: {
        id: true,
        studentId: true,
        quiz: {
          select: {
            id: true,
            title: true,
            course: {
              select: {
                id: true,
                title: true,
                instructorId: true,
              },
            },
          },
        },
      },
    });

    if (!attempt) {
      throw new NotFoundException('Quiz attempt tidak ditemukan');
    }

    if (role === Role.STUDENT && attempt.studentId !== userId) {
      throw new ForbiddenException(
        'Student hanya boleh melihat jawaban miliknya sendiri',
      );
    }

    if (
      role === Role.INSTRUCTOR &&
      attempt.quiz.course.instructorId !== userId
    ) {
      throw new ForbiddenException(
        'Instructor tidak boleh melihat jawaban dari course lain',
      );
    }

    const answers = await prismaClient['quizAnswer'].findMany({
      where: { attemptId },
      include: {
        question: {
          select: {
            id: true,
            question: true,
            type: true,
          },
        },
        selectedOption: {
          select: {
            id: true,
            optionText: true,
          },
        },
      },
      orderBy: [{ createdAt: 'asc' }],
    });

    return {
      attemptId: attempt.id,
      quiz: {
        id: attempt.quiz.id,
        title: attempt.quiz.title,
        courseId: attempt.quiz.course.id,
        courseTitle: attempt.quiz.course.title,
      },
      answers,
    };
  }

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
      throw new ForbiddenException(
        'Anda tidak boleh mengisi jawaban attempt milik user lain',
      );
    }

    const question = await prismaClient['quizQuestion'].findUnique({
      where: { id: createQuizAnswerDto.questionId },
      select: { id: true, quizId: true, type: true },
    });

    if (!question) {
      throw new NotFoundException('Quiz question tidak ditemukan');
    }

    if (question.quizId !== attempt.quizId) {
      throw new BadRequestException(
        'Question tidak termasuk dalam quiz attempt ini',
      );
    }

    let computedIsCorrect: boolean | null = null;

    if (question.type === 'MULTIPLE_CHOICE') {
      if (!createQuizAnswerDto.selectedOptionId) {
        throw new BadRequestException(
          'selectedOptionId wajib diisi untuk soal MULTIPLE_CHOICE',
        );
      }

      const selectedOption = await prismaClient['quizOption'].findUnique({
        where: { id: createQuizAnswerDto.selectedOptionId },
        select: { id: true, questionId: true, isCorrect: true },
      });

      if (!selectedOption) {
        throw new NotFoundException('Quiz option tidak ditemukan');
      }

      if (selectedOption.questionId !== question.id) {
        throw new BadRequestException(
          'selectedOptionId tidak valid untuk question ini',
        );
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

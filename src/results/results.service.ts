import { ForbiddenException, Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ResultsService {
  private readonly PASSING_SCORE = 70;

  constructor(private readonly prisma: PrismaService) {}

  private async upsertResultForAttempt(attempt: any) {
    const prismaClient = this.prisma as unknown as Record<string, any>;

    const questionList = await prismaClient['quizQuestion'].findMany({
      where: { quizId: attempt.quizId, type: 'MULTIPLE_CHOICE' },
      select: { id: true },
    });

    const gradableQuestionIds = questionList.map((q: any) => q.id);

    let score: number | null = attempt.score ?? null;

    if (score === null && gradableQuestionIds.length > 0) {
      const answers = await prismaClient['quizAnswer'].findMany({
        where: {
          attemptId: attempt.id,
          questionId: { in: gradableQuestionIds },
        },
        select: { isCorrect: true },
      });

      const correctCount = answers.filter(
        (a: any) => a.isCorrect === true,
      ).length;
      score = Number(
        ((correctCount / gradableQuestionIds.length) * 100).toFixed(2),
      );
    }

    const passed = score !== null ? score >= this.PASSING_SCORE : false;
    const remarks =
      attempt.status === 'IN_PROGRESS'
        ? 'Attempt belum disubmit'
        : passed
          ? 'Lulus'
          : 'Belum lulus';

    return prismaClient['result'].upsert({
      where: { attemptId: attempt.id },
      update: {
        score,
        passed,
        remarks,
      },
      create: {
        attemptId: attempt.id,
        studentId: attempt.studentId,
        quizId: attempt.quizId,
        score,
        passed,
        remarks,
      },
    });
  }

  private async ensureResultsForScope(where: any) {
    const prismaClient = this.prisma as unknown as Record<string, any>;

    const attempts = await prismaClient['quizAttempt'].findMany({
      where,
      select: {
        id: true,
        quizId: true,
        studentId: true,
        score: true,
        status: true,
      },
    });

    for (const attempt of attempts) {
      await this.upsertResultForAttempt(attempt);
    }
  }

  async findAllForUser(userId: string, role: Role) {
    const prismaClient = this.prisma as unknown as Record<string, any>;

    if (role === Role.STUDENT) {
      await this.ensureResultsForScope({ studentId: userId });
      return prismaClient['result'].findMany({
        where: { studentId: userId },
        include: {
          quiz: {
            select: { id: true, title: true, courseId: true },
          },
          attempt: {
            select: {
              id: true,
              status: true,
              startedAt: true,
              submittedAt: true,
            },
          },
        },
        orderBy: [{ createdAt: 'desc' }],
      });
    }

    await this.ensureResultsForScope({
      quiz: {
        course: {
          instructorId: userId,
        },
      },
    });

    return prismaClient['result'].findMany({
      where: {
        quiz: {
          course: {
            instructorId: userId,
          },
        },
      },
      include: {
        student: {
          select: { id: true, name: true, email: true },
        },
        quiz: {
          select: { id: true, title: true, courseId: true },
        },
        attempt: {
          select: {
            id: true,
            status: true,
            startedAt: true,
            submittedAt: true,
          },
        },
      },
      orderBy: [{ createdAt: 'desc' }],
    });
  }

  async findByStudentId(requestUserId: string, role: Role, studentId: string) {
    const prismaClient = this.prisma as unknown as Record<string, any>;

    if (role === Role.STUDENT && requestUserId !== studentId) {
      throw new ForbiddenException(
        'Student hanya boleh melihat result miliknya sendiri',
      );
    }

    if (role === Role.STUDENT) {
      await this.ensureResultsForScope({ studentId });
      return prismaClient['result'].findMany({
        where: { studentId },
        include: {
          quiz: {
            select: { id: true, title: true, courseId: true },
          },
          attempt: {
            select: {
              id: true,
              status: true,
              startedAt: true,
              submittedAt: true,
            },
          },
        },
        orderBy: [{ createdAt: 'desc' }],
      });
    }

    await this.ensureResultsForScope({
      studentId,
      quiz: {
        course: {
          instructorId: requestUserId,
        },
      },
    });

    return prismaClient['result'].findMany({
      where: {
        studentId,
        quiz: {
          course: {
            instructorId: requestUserId,
          },
        },
      },
      include: {
        student: {
          select: { id: true, name: true, email: true },
        },
        quiz: {
          select: { id: true, title: true, courseId: true },
        },
        attempt: {
          select: {
            id: true,
            status: true,
            startedAt: true,
            submittedAt: true,
          },
        },
      },
      orderBy: [{ createdAt: 'desc' }],
    });
  }
}

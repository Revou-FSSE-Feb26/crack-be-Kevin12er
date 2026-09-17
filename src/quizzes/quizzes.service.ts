import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuizDto } from './dto/create-quiz.dto';

@Injectable()
export class QuizzesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createQuizDto: CreateQuizDto) {
    const course = await this.prisma.course.findUnique({
      where: { id: createQuizDto.courseId },
      select: { id: true },
    });

    if (!course) {
      throw new NotFoundException('Course tidak ditemukan');
    }

    const prismaClient = this.prisma as unknown as Record<string, any>;

    return prismaClient['quiz'].create({
      data: {
        courseId: createQuizDto.courseId,
        title: createQuizDto.title,
        description: createQuizDto.description,
        timeLimit: createQuizDto.timeLimit,
      },
      include: {
        course: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });
  }

  async findAll(courseId?: string) {
    const prismaClient = this.prisma as unknown as Record<string, any>;

    return prismaClient['quiz'].findMany({
      where: courseId ? { courseId } : undefined,
      include: {
        course: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      orderBy: [{ createdAt: 'desc' }],
    });
  }

  async findOne(id: string) {
    const prismaClient = this.prisma as unknown as Record<string, any>;

    const quiz = await prismaClient['quiz'].findUnique({
      where: { id },
      include: {
        course: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    if (!quiz) {
      throw new NotFoundException('Quiz tidak ditemukan');
    }

    return quiz;
  }
}

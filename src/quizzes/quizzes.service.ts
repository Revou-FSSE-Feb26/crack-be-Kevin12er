import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';

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

    return this.prisma.quiz.create({
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

  async findAll(courseId?: string, search?: string) {
    return this.prisma.quiz.findMany({
      where: {
        ...(courseId && { courseId }),
        ...(search && {
          title: {
            contains: search,
            mode: 'insensitive',
          },
        }),
      },
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
    const quiz = await this.prisma.quiz.findUnique({
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

  async update(id: string, updateQuizDto: UpdateQuizDto) {
    await this.findOne(id); // Pastikan quiz ada

    if (updateQuizDto.courseId) {
      const course = await this.prisma.course.findUnique({
        where: { id: updateQuizDto.courseId },
      });
      if (!course) {
        throw new NotFoundException('Course target tidak ditemukan');
      }
    }

    return this.prisma.quiz.update({
      where: { id },
      data: updateQuizDto,
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

  async remove(id: string) {
    await this.findOne(id); // Pastikan quiz ada

    await this.prisma.quiz.delete({
      where: { id },
    });

    return { message: 'Quiz berhasil dihapus' };
  }
}
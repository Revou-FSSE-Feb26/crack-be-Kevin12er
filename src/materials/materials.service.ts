import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMaterialDto } from './dto/create-material.dto';

@Injectable()
export class MaterialsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMaterialDto: CreateMaterialDto, instructorId: string) {
    const course = await this.prisma.course.findUnique({
      where: { id: createMaterialDto.courseId },
      select: { id: true, instructorId: true },
    });

    if (!course) {
      throw new NotFoundException('Course tidak ditemukan');
    }

    if (course.instructorId !== instructorId) {
      throw new ForbiddenException(
        'Anda tidak memiliki izin untuk menambah materi di course ini',
      );
    }

    const prismaClient = this.prisma as unknown as Record<string, any>;

    return prismaClient['material'].create({
      data: {
        courseId: createMaterialDto.courseId,
        title: createMaterialDto.title,
        content: createMaterialDto.content,
        order: createMaterialDto.order ?? 0,
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

    return prismaClient['material'].findMany({
      where: courseId ? { courseId } : undefined,
      include: {
        course: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      orderBy: [{ courseId: 'asc' }, { order: 'asc' }, { createdAt: 'asc' }],
    });
  }
}

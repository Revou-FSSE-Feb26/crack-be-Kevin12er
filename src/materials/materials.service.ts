import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MaterialsService {
  constructor(private readonly prisma: PrismaService) {}

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

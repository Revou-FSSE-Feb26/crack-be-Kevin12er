import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';

@Injectable()
export class MaterialsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMaterialDto: CreateMaterialDto) {
    const course = await this.prisma.course.findUnique({
      where: { id: createMaterialDto.courseId },
      select: { id: true },
    });

    if (!course) {
      throw new NotFoundException('Course tidak ditemukan');
    }

    return this.prisma.material.create({
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

  async findAll(courseId?: string, search?: string) {
    return this.prisma.material.findMany({
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
      orderBy: [{ courseId: 'asc' }, { order: 'asc' }, { createdAt: 'asc' }],
    });
  }

  async findOne(id: string) {
    const material = await this.prisma.material.findUnique({
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

    if (!material) {
      throw new NotFoundException('Materi tidak ditemukan');
    }

    return material;
  }

  async update(id: string, updateMaterialDto: UpdateMaterialDto) {
    await this.findOne(id); // Pastikan materi ada

    if (updateMaterialDto.courseId) {
      const course = await this.prisma.course.findUnique({
        where: { id: updateMaterialDto.courseId },
      });
      if (!course) {
        throw new NotFoundException('Course target tidak ditemukan');
      }
    }

    return this.prisma.material.update({
      where: { id },
      data: updateMaterialDto,
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
    await this.findOne(id); // Pastikan materi ada

    await this.prisma.material.delete({ //disini dihapus
      where: { id },
    });

    return { message: 'Materi berhasil dihapus' };
  }
}
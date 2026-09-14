import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Sesuaikan path jika berbeda
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
  constructor(private readonly prisma: PrismaService) {}

  // 1. Buat Kelas Baru (Relasi otomatis ke Instructor)
  async create(createCourseDto: CreateCourseDto, instructorId: string) {
    return this.prisma.course.create({
      data: {
        ...createCourseDto,
        instructorId,
      },
      include: {
        instructor: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  // 2. Ambil Semua Kelas (Publik / Student)
  async findAll() {
    return this.prisma.course.findMany({
      include: {
        instructor: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // 3. Ambil Detail Kelas Berdasarkan ID
  async findOne(id: string) {
    const course = await this.prisma.course.findUnique({
      where: { id },
      include: {
        instructor: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!course) {
      throw new NotFoundException(`Kelas dengan ID "${id}" tidak ditemukan`);
    }

    return course;
  }

  // 4. Update Kelas (Hanya oleh Instructor Pemilik Kelas)
  async update(id: string, updateCourseDto: UpdateCourseDto, instructorId: string) {
    const course = await this.findOne(id);

    if (course.instructorId !== instructorId) {
      throw new ForbiddenException('Anda tidak memiliki izin untuk mengubah kelas ini');
    }

    return this.prisma.course.update({
      where: { id },
      data: updateCourseDto,
    });
  }

  // 5. Hapus Kelas (Hanya oleh Instructor Pemilik Kelas)
  async remove(id: string, instructorId: string) {
    const course = await this.findOne(id);

    if (course.instructorId !== instructorId) {
      throw new ForbiddenException('Anda tidak memiliki izin untuk menghapus kelas ini');
    }

    await this.prisma.course.delete({
      where: { id },
    });

    return { message: 'Kelas berhasil dihapus' };
  }
}
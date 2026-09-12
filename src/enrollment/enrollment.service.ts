import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';

@Injectable()
export class EnrollmentService {
  constructor(private readonly prisma: PrismaService) {}

  async enroll(studentId: string, createEnrollmentDto: CreateEnrollmentDto) {
    const { courseId } = createEnrollmentDto;

    // 1. Cek apakah course ada
    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      throw new NotFoundException('Course tidak ditemukan');
    }

    // 2. Cek apakah siswa sudah terdaftar di course ini
    const existingEnrollment = await this.prisma.enrollment.findUnique({
      where: {
        studentId_courseId: {
          studentId,
          courseId,
        },
      },
    });

    if (existingEnrollment) {
      throw new ConflictException('Anda sudah mendaftar di course ini');
    }

    // 3. Simpan pendaftaran baru
    return this.prisma.enrollment.create({
      data: {
        studentId,
        courseId,
      },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            description: true,
            instructor: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });
  }

  // Mengambil daftar course yang diikuti oleh siswa
  async getMyEnrollments(studentId: string) {
    return this.prisma.enrollment.findMany({
      where: { studentId },
      include: {
        course: {
          include: {
            instructor: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });
  }
}

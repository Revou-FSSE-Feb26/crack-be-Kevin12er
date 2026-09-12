import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class EnrollmentService {
  constructor(private readonly prisma: PrismaService) {}

  async enroll(studentId: string, createEnrollmentDto: CreateEnrollmentDto) {
    const { courseId } = createEnrollmentDto;

    // Validasi user dari token masih ada di database
    const student = await this.prisma.user.findUnique({
      where: { id: studentId },
      select: { id: true },
    });

    if (!student) {
      throw new BadRequestException(
        'User siswa tidak valid atau sudah tidak tersedia',
      );
    }

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
    try {
      return await this.prisma.enrollment.create({
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
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Anda sudah mendaftar di course ini');
        }

        if (error.code === 'P2003') {
          throw new BadRequestException('Data enrollment tidak valid');
        }
      }

      throw error;
    }
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

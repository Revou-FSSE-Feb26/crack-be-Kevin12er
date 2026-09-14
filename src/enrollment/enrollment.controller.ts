import { Controller, Post, Get, Body, UseGuards, Req } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
} from '@nestjs/swagger';
import { EnrollmentService } from './enrollment.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('Enrollments')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('enrollments')
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @ApiOperation({ summary: 'Mendaftar ke course (Khusus STUDENT)' })
  @ApiResponse({ status: 201, description: 'Berhasil mendaftar ke course.' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden (Hanya STUDENT yang bisa mendaftar).',
  })
  @ApiResponse({
    status: 409,
    description: 'Anda sudah mendaftar di course ini.',
  })
  @Roles(Role.STUDENT)
  @Post()
  create(@Body() createEnrollmentDto: CreateEnrollmentDto, @Req() req: any) {
    return this.enrollmentService.enroll(req.user.userId, createEnrollmentDto);
  }

  @ApiOperation({
    summary: 'Mengambil daftar course yang sudah didaftari (Khusus STUDENT)',
  })
  @ApiResponse({
    status: 200,
    description: 'Menampilkan array course milik student.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden (Hanya STUDENT).' })
  @Roles(Role.STUDENT)
  @Get('my-courses')
  findMyCourses(@Req() req: any) {
    return this.enrollmentService.getMyEnrollments(req.user.userId);
  }
}

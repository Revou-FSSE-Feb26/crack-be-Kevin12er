import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { QuizzesService } from './quizzes.service';

@ApiTags('Quizzes')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @ApiOperation({ summary: 'Membuat quiz (Khusus Instructor)' })
  @ApiResponse({ status: 201, description: 'Quiz berhasil dibuat.' })
  @ApiResponse({
    status: 403,
    description: 'Akses ditolak (hanya instructor).',
  })
  @ApiResponse({ status: 404, description: 'Course tidak ditemukan.' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.INSTRUCTOR)
  @Post()
  create(@Body() createQuizDto: CreateQuizDto) {
    return this.quizzesService.create(createQuizDto);
  }

  @ApiOperation({ summary: 'Mengambil daftar quiz' })
  @ApiResponse({ status: 200, description: 'Daftar quiz berhasil diambil.' })
  @ApiQuery({
    name: 'courseId',
    required: false,
    description: 'Filter quiz berdasarkan courseId',
  })
  @Get()
  findAll(@Query('courseId') courseId?: string) {
    return this.quizzesService.findAll(courseId);
  }
}

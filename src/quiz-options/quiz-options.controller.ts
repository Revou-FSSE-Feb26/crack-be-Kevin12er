import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CreateQuizOptionDto } from './dto/create-quiz-option.dto';
import { QuizOptionsService } from './quiz-options.service';

@ApiTags('Quiz Options')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('quiz-options')
export class QuizOptionsController {
  constructor(private readonly quizOptionsService: QuizOptionsService) {}

  @ApiOperation({ summary: 'Membuat opsi jawaban (Khusus Instructor)' })
  @ApiResponse({ status: 201, description: 'Opsi jawaban berhasil dibuat.' })
  @ApiResponse({
    status: 403,
    description: 'Akses ditolak (hanya instructor).',
  })
  @ApiResponse({ status: 404, description: 'Quiz question tidak ditemukan.' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.INSTRUCTOR)
  @Post()
  create(@Body() createQuizOptionDto: CreateQuizOptionDto) {
    return this.quizOptionsService.create(createQuizOptionDto);
  }

  @ApiOperation({ summary: 'Mengambil opsi jawaban berdasarkan questionId' })
  @ApiParam({ name: 'questionId', description: 'ID quiz question' })
  @ApiResponse({ status: 200, description: 'Daftar opsi berhasil diambil.' })
  @Get('question/:questionId')
  findByQuestionId(@Param('questionId') questionId: string) {
    return this.quizOptionsService.findByQuestionId(questionId);
  }
}

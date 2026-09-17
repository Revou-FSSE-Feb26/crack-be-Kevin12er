import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CreateQuizAttemptDto } from './dto/create-quiz-attempt.dto';
import { QuizAttemptsService } from './quiz-attempts.service';

@ApiTags('Quiz Attempts')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('quiz-attempts')
export class QuizAttemptsController {
  constructor(private readonly quizAttemptsService: QuizAttemptsService) {}

  @ApiOperation({ summary: 'Melihat daftar attempt milik student yang login' })
  @ApiResponse({ status: 200, description: 'Daftar attempt berhasil diambil.' })
  @ApiResponse({ status: 403, description: 'Akses ditolak (hanya student).' })
  @Roles(Role.STUDENT)
  @Get()
  findMyAttempts(@Req() req: any) {
    return this.quizAttemptsService.findMyAttempts(req.user.userId);
  }

  @ApiOperation({ summary: 'Memulai attempt quiz (Khusus Student)' })
  @ApiResponse({ status: 201, description: 'Attempt quiz berhasil dibuat.' })
  @ApiResponse({
    status: 403,
    description: 'Akses ditolak atau belum enrollment.',
  })
  @ApiResponse({ status: 404, description: 'Quiz tidak ditemukan.' })
  @Roles(Role.STUDENT)
  @Post()
  create(@Body() createQuizAttemptDto: CreateQuizAttemptDto, @Req() req: any) {
    return this.quizAttemptsService.create(
      createQuizAttemptDto,
      req.user.userId,
    );
  }
}

import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
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
import { CreateQuizAnswerDto } from './dto/create-quiz-answer.dto';
import { QuizAnswersService } from './quiz-answers.service';

@ApiTags('Quiz Answers')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('quiz-answers')
export class QuizAnswersController {
  constructor(private readonly quizAnswersService: QuizAnswersService) {}

  @ApiOperation({ summary: 'Menyimpan jawaban soal quiz (Khusus Student)' })
  @ApiResponse({ status: 201, description: 'Jawaban berhasil disimpan.' })
  @ApiResponse({ status: 400, description: 'Payload jawaban tidak valid.' })
  @ApiResponse({ status: 403, description: 'Akses ditolak (hanya student).' })
  @ApiResponse({
    status: 404,
    description: 'Attempt/question/option tidak ditemukan.',
  })
  @Roles(Role.STUDENT)
  @Post()
  create(@Body() createQuizAnswerDto: CreateQuizAnswerDto, @Req() req: any) {
    return this.quizAnswersService.create(createQuizAnswerDto, req.user.userId);
  }
}

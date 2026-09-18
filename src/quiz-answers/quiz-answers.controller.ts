import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
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
import { CreateQuizAnswerDto } from './dto/create-quiz-answer.dto';
import { QuizAnswersService } from './quiz-answers.service';

@ApiTags('Quiz Answers')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('quiz-answers')
export class QuizAnswersController {
  constructor(private readonly quizAnswersService: QuizAnswersService) {}

  @ApiOperation({ summary: 'Melihat jawaban berdasarkan attemptId' })
  @ApiParam({ name: 'attemptId', description: 'ID quiz attempt' })
  @ApiResponse({ status: 200, description: 'Daftar jawaban berhasil diambil.' })
  @ApiResponse({
    status: 403,
    description: 'Tidak punya akses ke attempt ini.',
  })
  @ApiResponse({ status: 404, description: 'Quiz attempt tidak ditemukan.' })
  @Roles(Role.STUDENT, Role.INSTRUCTOR)
  @Get('attempt/:attemptId')
  findByAttemptId(@Param('attemptId') attemptId: string, @Req() req: any) {
    return this.quizAnswersService.findByAttemptId(
      attemptId,
      req.user.userId,
      req.user.role,
    );
  }

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

import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { QuizzesService } from './quizzes.service';

@ApiTags('Quizzes')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

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

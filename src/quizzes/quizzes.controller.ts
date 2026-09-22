import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
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

  @ApiOperation({ summary: 'Mengambil daftar quiz (Bisa filter search & courseId)' })
  @ApiResponse({ status: 200, description: 'Daftar quiz berhasil diambil.' })
  @ApiQuery({
    name: 'courseId',
    required: false,
    description: 'Filter quiz berdasarkan courseId',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Filter pencarian berdasarkan judul quiz',
  })
  @Get()
  findAll(
    @Query('courseId') courseId?: string,
    @Query('search') search?: string,
  ) {
    return this.quizzesService.findAll(courseId, search);
  }

  @ApiOperation({ summary: 'Mengambil detail quiz berdasarkan ID' })
  @ApiParam({ name: 'id', description: 'ID quiz' })
  @ApiResponse({ status: 200, description: 'Detail quiz berhasil diambil.' })
  @ApiResponse({ status: 404, description: 'Quiz tidak ditemukan.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quizzesService.findOne(id);
  }

  @ApiOperation({ summary: 'Perbarui quiz (Khusus Instructor)' })
  @ApiResponse({ status: 200, description: 'Quiz berhasil diperbarui.' })
  @ApiResponse({ status: 403, description: 'Akses ditolak.' })
  @ApiResponse({ status: 404, description: 'Quiz tidak ditemukan.' })
  @ApiParam({ name: 'id', description: 'ID Quiz' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.INSTRUCTOR)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuizDto: UpdateQuizDto) {
    return this.quizzesService.update(id, updateQuizDto);
  }

  @ApiOperation({ summary: 'Hapus quiz (Khusus Instructor)' })
  @ApiResponse({ status: 200, description: 'Quiz berhasil dihapus.' })
  @ApiResponse({ status: 403, description: 'Akses ditolak.' })
  @ApiResponse({ status: 404, description: 'Quiz tidak ditemukan.' })
  @ApiParam({ name: 'id', description: 'ID Quiz' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.INSTRUCTOR)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quizzesService.remove(id);
  }
}
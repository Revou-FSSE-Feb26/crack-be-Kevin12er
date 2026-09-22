import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiParam,
  ApiResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('Courses')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  // 1. BUAT KELAS BARU (Hanya INSTRUCTOR)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Membuat course baru (Khusus Instructor)' })
  @ApiResponse({ status: 201, description: 'Course berhasil dibuat.' })
  @ApiResponse({ status: 403, description: 'Akses ditolak (Hanya Instructor).' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.INSTRUCTOR)
  @Post()
  create(@Body() createCourseDto: CreateCourseDto, @Req() req: any) {
    return this.coursesService.create(createCourseDto, req.user.userId);
  }

  // 2. AMBIL SEMUA KELAS (Publik - Dengan Filter Browse & Search)
  @ApiOperation({ summary: 'Mengambil seluruh daftar course (Publik dengan Filter)' })
  @ApiResponse({ status: 200, description: 'Menampilkan list course.' })
  @ApiQuery({ name: 'search', required: false, description: 'Cari berdasarkan judul/deskripsi' })
  @ApiQuery({ name: 'category', required: false, description: 'Filter berdasarkan kategori' })
  @ApiQuery({ name: 'minPrice', required: false, description: 'Harga minimal', type: Number })
  @ApiQuery({ name: 'maxPrice', required: false, description: 'Harga maksimal', type: Number })
  @Get()
  findAll(
    @Query('search') search?: string,
    @Query('category') category?: string,
    @Query('minPrice') minPrice?: string,
    @Query('maxPrice') maxPrice?: string,
  ) {
    return this.coursesService.findAll(
      search,
      category,
      minPrice ? Number(minPrice) : undefined,
      maxPrice ? Number(maxPrice) : undefined,
    );
  }

  // 3. AMBIL DETAIL KELAS BY ID (Publik)
  @ApiOperation({ summary: 'Mengambil detail course berdasarkan ID (Publik)' })
  @ApiParam({ name: 'id', description: 'ID dari course yang ingin dicari' })
  @ApiResponse({ status: 200, description: 'Detail course ditemukan.' })
  @ApiResponse({ status: 404, description: 'Course tidak ditemukan.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }

  // 4. UPDATE KELAS (Hanya INSTRUCTOR)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Memperbarui data course (Khusus Instructor pemilik)' })
  @ApiParam({ name: 'id', description: 'ID dari course yang akan diupdate' })
  @ApiResponse({ status: 200, description: 'Course berhasil diupdate.' })
  @ApiResponse({ status: 403, description: 'Bukan pemilik course / Unauthorized.' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.INSTRUCTOR)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
    @Req() req: any,
  ) {
    return this.coursesService.update(id, updateCourseDto, req.user.userId);
  }

  // 5. HAPUS KELAS (Hanya INSTRUCTOR)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Menghapus course (Khusus Instructor pemilik)' })
  @ApiParam({ name: 'id', description: 'ID dari course yang akan dihapus' })
  @ApiResponse({ status: 200, description: 'Course berhasil dihapus.' })
  @ApiResponse({ status: 403, description: 'Bukan pemilik course / Unauthorized.' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.INSTRUCTOR)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    return this.coursesService.remove(id, req.user.userId);
  }
}
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
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';             // Panggil langsung dari folder auth
import { RolesGuard } from '../auth/guards/roles.guard';          // Sesuaikan jika roles guard ada di subfolder guards
import { Roles } from '../auth/decorators/roles.decorator';       // Sesuaikan jika decorator ada di subfolder decorators
import { Role } from '@prisma/client';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  // 1. BUAT KELAS BARU (Hanya INSTRUCTOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.INSTRUCTOR)
  @Post()
  create(@Body() createCourseDto: CreateCourseDto, @Req() req: any) {
    // req.user.userId didapat dari JWT Strategy payload
    return this.coursesService.create(createCourseDto, req.user.userId);
  }

  // 2. AMBIL SEMUA KELAS (Publik)
  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  // 3. AMBIL DETAIL KELAS BY ID (Publik)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }

  // 4. UPDATE KELAS (Hanya INSTRUCTOR)
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.INSTRUCTOR)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    return this.coursesService.remove(id, req.user.userId);
  }
}
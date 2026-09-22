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
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { MaterialsService } from './materials.service';

@ApiTags('Materials')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('materials')
export class MaterialsController {
  constructor(private readonly materialsService: MaterialsService) {}

  @ApiOperation({ summary: 'Membuat materi pembelajaran (Khusus Instructor)' })
  @ApiResponse({ status: 201, description: 'Materi berhasil dibuat.' })
  @ApiResponse({
    status: 403,
    description: 'Akses ditolak (hanya instructor).',
  })
  @ApiResponse({ status: 404, description: 'Course tidak ditemukan.' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.INSTRUCTOR)
  @Post()
  create(@Body() createMaterialDto: CreateMaterialDto) {
    return this.materialsService.create(createMaterialDto);
  }

  @ApiOperation({ summary: 'Mengambil daftar materi pembelajaran (Bisa filter search & courseId)' })
  @ApiResponse({ status: 200, description: 'Daftar materi berhasil diambil.' })
  @ApiQuery({
    name: 'courseId',
    required: false,
    description: 'Filter materi berdasarkan courseId',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Filter pencarian berdasarkan judul materi',
  })
  @Get()
  findAll(
    @Query('courseId') courseId?: string,
    @Query('search') search?: string,
  ) {
    return this.materialsService.findAll(courseId, search);
  }

  @ApiOperation({ summary: 'Mengambil detail materi berdasarkan ID' })
  @ApiResponse({ status: 200, description: 'Detail materi ditemukan.' })
  @ApiResponse({ status: 404, description: 'Materi tidak ditemukan.' })
  @ApiParam({ name: 'id', description: 'ID Materi' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.materialsService.findOne(id);
  }

  @ApiOperation({ summary: 'Perbarui materi pembelajaran (Khusus Instructor)' })
  @ApiResponse({ status: 200, description: 'Materi berhasil diperbarui.' })
  @ApiResponse({ status: 403, description: 'Akses ditolak.' })
  @ApiResponse({ status: 404, description: 'Materi tidak ditemukan.' })
  @ApiParam({ name: 'id', description: 'ID Materi' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.INSTRUCTOR)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMaterialDto: UpdateMaterialDto,
  ) {
    return this.materialsService.update(id, updateMaterialDto);
  }

  @ApiOperation({ summary: 'Hapus materi pembelajaran (Khusus Instructor)' })
  @ApiResponse({ status: 200, description: 'Materi berhasil dihapus.' })
  @ApiResponse({ status: 403, description: 'Akses ditolak.' })
  @ApiResponse({ status: 404, description: 'Materi tidak ditemukan.' })
  @ApiParam({ name: 'id', description: 'ID Materi' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.INSTRUCTOR)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.materialsService.remove(id);
  }
}
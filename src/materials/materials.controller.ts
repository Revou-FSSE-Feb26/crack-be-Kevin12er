import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CreateMaterialDto } from './dto/create-material.dto';
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.INSTRUCTOR)
  @Post()
  create(@Body() createMaterialDto: CreateMaterialDto, @Req() req: any) {
    return this.materialsService.create(createMaterialDto, req.user.userId);
  }

  @ApiOperation({ summary: 'Mengambil daftar materi pembelajaran' })
  @ApiResponse({ status: 200, description: 'Daftar materi berhasil diambil.' })
  @ApiQuery({
    name: 'courseId',
    required: false,
    description: 'Filter materi berdasarkan courseId',
  })
  @Get()
  findAll(@Query('courseId') courseId?: string) {
    return this.materialsService.findAll(courseId);
  }
}

import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MaterialsService } from './materials.service';

@ApiTags('Materials')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('materials')
export class MaterialsController {
  constructor(private readonly materialsService: MaterialsService) {}

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

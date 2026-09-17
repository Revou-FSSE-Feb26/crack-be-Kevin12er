import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
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
import { ResultsService } from './results.service';

@ApiTags('Results')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.STUDENT, Role.INSTRUCTOR)
@Controller('results')
export class ResultsController {
  constructor(private readonly resultsService: ResultsService) {}

  @ApiOperation({ summary: 'Melihat daftar hasil quiz sesuai hak akses user' })
  @ApiResponse({ status: 200, description: 'Daftar result berhasil diambil.' })
  @Get()
  findAll(@Req() req: any) {
    return this.resultsService.findAllForUser(req.user.userId, req.user.role);
  }

  @ApiOperation({ summary: 'Melihat hasil quiz berdasarkan studentId' })
  @ApiParam({ name: 'studentId', description: 'ID student' })
  @ApiResponse({
    status: 200,
    description: 'Daftar result student berhasil diambil.',
  })
  @ApiResponse({
    status: 403,
    description: 'Student tidak boleh akses milik user lain.',
  })
  @Get(':studentId')
  findByStudentId(@Req() req: any, @Param('studentId') studentId: string) {
    return this.resultsService.findByStudentId(
      req.user.userId,
      req.user.role,
      studentId,
    );
  }
}

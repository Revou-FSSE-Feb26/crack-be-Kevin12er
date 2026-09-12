import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

interface AuthenticatedRequest {
  user: {
    userId: string;
  };
}

@Controller('enrollments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @Post()
  @Roles(Role.STUDENT)
  async enroll(
    @Request() req: AuthenticatedRequest,
    @Body() createEnrollmentDto: CreateEnrollmentDto,
  ) {
    return this.enrollmentService.enroll(req.user.userId, createEnrollmentDto);
  }

  @Get('my-courses')
  @Roles(Role.STUDENT)
  async getMyEnrollments(@Request() req: AuthenticatedRequest) {
    return this.enrollmentService.getMyEnrollments(req.user.userId);
  }
}

import { jest } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { EnrollmentController } from './enrollment.controller';
import { EnrollmentService } from './enrollment.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

describe('EnrollmentController', () => {
  let controller: EnrollmentController;

  const enrollmentServiceMock = {
    enroll: jest.fn(),
    getMyEnrollments: jest.fn(),
  };

  const guardMock = {
    canActivate: jest.fn(() => true),
  };

  beforeEach(async () => {
    const moduleBuilder = Test.createTestingModule({
      controllers: [EnrollmentController],
      providers: [
        { provide: EnrollmentService, useValue: enrollmentServiceMock },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue(guardMock)
      .overrideGuard(RolesGuard)
      .useValue(guardMock);

    const module: TestingModule = await moduleBuilder.compile();

    controller = module.get<EnrollmentController>(EnrollmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

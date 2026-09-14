import { jest } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';

describe('AuthController', () => {
  let controller: AuthController;

  const authServiceMock = {
    register: jest.fn(),
    login: jest.fn(),
  };

  const guardMock = {
    canActivate: jest.fn(() => true),
  };

  beforeEach(async () => {
    const moduleBuilder = Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: authServiceMock }],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue(guardMock)
      .overrideGuard(RolesGuard)
      .useValue(guardMock);

    const module: TestingModule = await moduleBuilder.compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

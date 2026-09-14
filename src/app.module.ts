import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { CoursesModule } from './courses/courses.module';
import { EnrollmentModule } from './enrollment/enrollment.module';

@Module({
  imports: [PrismaModule, AuthModule, CoursesModule, EnrollmentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

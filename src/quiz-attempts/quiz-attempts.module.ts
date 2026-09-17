import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module';
import { QuizAttemptsController } from './quiz-attempts.controller';
import { QuizAttemptsService } from './quiz-attempts.service';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [QuizAttemptsController],
  providers: [QuizAttemptsService],
})
export class QuizAttemptsModule {}

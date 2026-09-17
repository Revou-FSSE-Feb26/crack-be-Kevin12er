import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module';
import { QuizAnswersController } from './quiz-answers.controller';
import { QuizAnswersService } from './quiz-answers.service';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [QuizAnswersController],
  providers: [QuizAnswersService],
})
export class QuizAnswersModule {}

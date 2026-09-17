import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module';
import { QuizQuestionsController } from './quiz-questions.controller';
import { QuizQuestionsService } from './quiz-questions.service';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [QuizQuestionsController],
  providers: [QuizQuestionsService],
})
export class QuizQuestionsModule {}

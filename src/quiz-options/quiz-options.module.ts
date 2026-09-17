import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module';
import { QuizOptionsController } from './quiz-options.controller';
import { QuizOptionsService } from './quiz-options.service';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [QuizOptionsController],
  providers: [QuizOptionsService],
})
export class QuizOptionsModule {}

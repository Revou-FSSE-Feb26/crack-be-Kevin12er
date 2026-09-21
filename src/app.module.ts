import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { CoursesModule } from './courses/courses.module';
import { EnrollmentModule } from './enrollment/enrollment.module';
import { MaterialsModule } from './materials/materials.module';
import { QuizzesModule } from './quizzes/quizzes.module';
import { QuizAttemptsModule } from './quiz-attempts/quiz-attempts.module';
import { QuizQuestionsModule } from './quiz-questions/quiz-questions.module';
import { QuizOptionsModule } from './quiz-options/quiz-options.module';
import { QuizAnswersModule } from './quiz-answers/quiz-answers.module';
import { ResultsModule } from './results/results.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    CoursesModule,
    EnrollmentModule,
    MaterialsModule,
    QuizzesModule,
    QuizAttemptsModule,
    QuizQuestionsModule,
    QuizOptionsModule,
    QuizAnswersModule,
    ResultsModule,
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

# Backend LMS (NestJS + Prisma)

Backend ini adalah REST API untuk Learning Management System (LMS), dibangun dengan NestJS, Prisma ORM v7, dan PostgreSQL.

## Fitur Yang Sudah Ada

- Auth JWT: `register`, `login`, `profile`
- Role user: `STUDENT` dan `INSTRUCTOR`
- Course management (create, read, update, delete)
- Enrollment siswa ke course
- Materials (materi pembelajaran)
- Quizzes (data quiz)
- Quiz Questions (bank soal per quiz)
- Quiz Options (opsi jawaban per question)
- Quiz Attempts (tracking percobaan pengerjaan siswa)
- Quiz Answers (simpan jawaban siswa)
- Results (rekap hasil nilai siswa)
- Swagger docs untuk uji endpoint

## Tech Stack

- NestJS
- Prisma ORM 7
- PostgreSQL
- JWT
- Docker (database lokal)
- Jest

## Struktur Folder Project

```text
.
|-- prisma/
|   |-- schema.prisma
|   |-- seed.ts
|   `-- migrations/
|-- src/
|   |-- app.controller.ts
|   |-- app.module.ts
|   |-- app.service.ts
|   |-- main.ts
|   |-- auth/
|   |-- courses/
|   |-- enrollment/
|   |-- materials/
|   |-- prisma/
|   |-- quiz-answers/
|   |-- quiz-attempts/
|   |-- quiz-options/
|   |-- quiz-questions/
|   |-- quizzes/
|   `-- results/
|-- test/
|-- docker-compose.yml
|-- jest.config.ts
|-- nest-cli.json
|-- package.json
|-- prisma7.config.ts
|-- tsconfig.json
`-- tsconfig.spec.json
```

## Penjelasan Folder `src`

- `auth/`: register, login, JWT strategy, guards, role-based access.
- `courses/`: CRUD course.
- `enrollment/`: pendaftaran student ke course.
- `materials/`: materi pembelajaran per course.
- `quizzes/`: data quiz per course.
- `quiz-questions/`: soal per quiz.
- `quiz-options/`: opsi jawaban per question.
- `quiz-attempts/`: sesi pengerjaan quiz oleh siswa.
- `quiz-answers/`: jawaban siswa per question.
- `results/`: hasil nilai akhir siswa.
- `prisma/`: `PrismaService` dan `PrismaModule`.

## Model Database Utama

Model yang sudah ada di `prisma/schema.prisma`:

- `User`
- `Course`
- `Enrollment`
- `Material`
- `Quiz`
- `QuizQuestion`
- `QuizOption`
- `QuizAttempt`
- `QuizAnswer`
- `Result`

Enum yang sudah digunakan:

- `Role` (`INSTRUCTOR`, `STUDENT`)
- `QuestionType` (`MULTIPLE_CHOICE`, `ESSAY`)
- `QuizAttemptStatus` (`IN_PROGRESS`, `SUBMITTED`, `GRADED`)

## Endpoint Tambahan Yang Sudah Diimplementasi

- `GET /materials`
- `POST /materials`
- `GET /quizzes`
- `POST /quizzes`
- `GET /quizzes/:id`
- `POST /quiz-attempts`
- `GET /quiz-attempts`
- `POST /quiz-questions`
- `GET /quiz-questions/quiz/:quizId`
- `POST /quiz-options`
- `GET /quiz-options/question/:questionId`
- `POST /quiz-answers`
- `GET /quiz-answers/attempt/:attemptId`
- `GET /results`
- `GET /results/:studentId`

## Environment Variables

Isi file `.env` minimal:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DB_NAME?schema=public"
JWT_SECRET="isi_dengan_secret_panjang"
```

## Cara Menjalankan Lokal

1. Install dependency:

```bash
npm install
```

2. Jalankan PostgreSQL lokal:

```bash
docker compose up -d
```

3. Generate Prisma Client:

```bash
npx prisma generate
```

4. Jalankan migrasi database:

```bash
npx prisma migrate dev
```

5. Jalankan server:

```bash
npm run start:dev
```

6. Buka Swagger:

```text
http://localhost:3001/api/docs
```

## Script Penting

- `npm run start:dev`
- `npm run build`
- `npm run start:prod`
- `npm run test`
- `npm run test:e2e`

## Live Production

- Swagger: `https://crack-be-kevin12er-production.up.railway.app/api/docs`
- Base API: `https://crack-be-kevin12er-production.up.railway.app`

## Deploy Ke Railway

1. Push code ke GitHub.
2. Hubungkan repo ke Railway + PostgreSQL service.
3. Isi variables:

- `DATABASE_URL`
- `JWT_SECRET`

4. Set start command:

```bash
npx prisma generate && npx prisma migrate deploy && npm run build && npm run start:prod
```

## Author

- Nama: Kevin Langga
- Program: RevoU Software Engineering (FSSE) 2026
- GitHub: [https://github.com/Kevin12er]
- LinkedIn: [https://www.linkedin.com/in/kevin-langga-a0303a355/]

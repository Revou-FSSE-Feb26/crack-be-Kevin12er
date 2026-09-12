import { PrismaClient, Role } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as bcrypt from 'bcrypt';
import 'dotenv/config';

// Inisialisasi pool PostgreSQL dan adapter Prisma v7
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10);

  // 1. Seed Instructor
  const instructor = await prisma.user.upsert({
    where: { email: 'instructor@example.com' },
    update: {},
    create: {
      name: 'Instruktur Utama',
      email: 'instructor@example.com',
      password: hashedPassword,
      role: Role.INSTRUCTOR,
    },
  });

  // 2. Seed Student
  const student = await prisma.user.upsert({
    where: { email: 'student@example.com' },
    update: {},
    create: {
      name: 'Siswa Pertama',
      email: 'student@example.com',
      password: hashedPassword,
      role: Role.STUDENT,
    },
  });

  // 3. Seed Course
  const course = await prisma.course.create({
    data: {
      title: 'Pemrograman NestJS Dasar',
      description: 'Belajar membuat backend REST API dengan NestJS dan Prisma',
      price: 0,
      instructorId: instructor.id,
    },
  });

  console.log('Seeding berhasil!');
  console.log({ instructor, student, course });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
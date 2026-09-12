import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    const hashedPassword = await bcrypt.hash('password123', 10);


    // seed Instructor
    const instructor = await prisma.user.upsert({
        where: { email: 'instructor@example.com' },
        update: {},
        create: {
            name: 'Instructor Utama',
            email: 'instructor@example.com',
            password: hashedPassword,
            role: Role.INSTRUCTOR,
        },
    });

    // seed student
    const student = await prisma.user.upsert({
        where: { email: 'student@example.com' },
        update: {},
        create: {
            name : 'Siswa sekolah',
            email: 'student@example.com',
            password: hashedPassword,
            role: Role.STUDENT,
        },
    });

    // seed course
    const course = await prisma.course.create({
        data: {
            title: 'Pemrograman NestJS dasar',
            description: 'Membuat REST API',
            price: 0,
            instructorId: instructor.id,
        },
    });

    console.log('seeding berhasil!');
    console.log({ instructor, student, course })
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
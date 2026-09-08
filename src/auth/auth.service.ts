import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; 
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async register(registerDto: RegisterDto) {
    const { email, password } = registerDto;

    // 1. Cek Apakah Email Sudah Terdaftar
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('Email sudah terdaftar. Silakan gunakan email lain.');
    }

    // 2. Hash Password
    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(password, saltRound);

    // 3. Simpan User Baru ke Database
    const newUser = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    // 4. Return Pesan Sukses & Data User (Tanpa Password)
    // Menghapus properti password menggunakan object destructuring rest
    const { password: _, ...userWithoutPassword } = newUser;

    return {
      message: 'Registrasi berhasil!',
      data: userWithoutPassword,
    };
  }
}

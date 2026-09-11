import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'super-secret-key', //secret key jwt, dipoin ini JWT_SECRET adalah poin utama untuk diproses sama si nest.js, tapi jika nilainya masih undefined alias aku belum menulis kode jwt nya di .env maka nest akan menampilkan tulisan 'super-secret-keys'
      signOptions: { expiresIn: '1d' } // Token berlaku selama 1 hari
    })
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})

export class AuthModule {}

//1. disini secret key jwt berlaku sebagai "KTP DIGITAL", karena ini memrupakan praktik terbaik untuk mencegah hacker
//memanipulasi data dan untuk memastikan token asli agar nest.js tidak perlu mengecek database berkali kali.
//2. untuk kasus hacker disini jika dia mencoba mengubah email didalam token dari siswa@gmail.com stempelnya akan rusak karena
//dia tidak tahu apa secret key nya 

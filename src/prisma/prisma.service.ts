import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from 'dotenv';
// Penambahan dotenv.config() dan 
//  fallback connection string di PrismaService memastikan pg selalu memegang nilai kueri koneksi yang sah sejak detik pertama server dinyalakan.

// Pastikan environment variable dimuat lebih awal
dotenv.config();

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    const connectionString = process.env.DATABASE_URL || 'postgresql://lms_user:lmspassword@127.0.0.1:5433/lms_db?schema=public';
    
    const pool = new Pool({ 
      connectionString,
    });
    const adapter = new PrismaPg(pool);
    
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
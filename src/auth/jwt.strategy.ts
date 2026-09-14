import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Role } from '@prisma/client';

// Define bentuk interface payload dari JWT
export interface JwtPayload {
  sub: string;
  email: string;
  role: Role;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'super-secret-key',
    });
  }

  // Tambahkan tipe JwtPayload pada parameter payload
  async validate(payload: JwtPayload) {
    console.log('--JWT PAYLOAD BERHASIL DIBACA--', payload)
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}
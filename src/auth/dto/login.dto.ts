import { IsEmail, IsNotEmpty, IsString } from 'class-validator';


// Validasi untuk login
export class LoginDto {
    @IsEmail({}, { message: 'Format email tidak valid' })
    @IsNotEmpty({ message: 'email wajib diisi' })
    email: string;

    @IsString()
    @IsNotEmpty({ message: 'Password wajib diisi' })
    password: string
}
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";


export class RegisterDto {
    @IsEmail({}, { message: 'Format Email tidak valid'})
    @IsNotEmpty ({message: 'Email tidak boleh kosong'})
    email!: string;

    @IsString({ message: 'Password harus berupa string' })
    @IsNotEmpty({message: 'Password tidak boleh kosong'})
    @MinLength(8, {message: 'Password minimal 8 huruf'})
    password!: string;
}
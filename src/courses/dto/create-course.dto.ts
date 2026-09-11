import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator'

export class CreateCourseDto {
    @IsString()
    @IsNotEmpty({ message: 'Judul kelas tidak boleh kosong' })
    title: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsNumber()
    @Min(0, { message: 'Harga kelas tidak boleh negatif' })
    @IsOptional()
    price?: number
}

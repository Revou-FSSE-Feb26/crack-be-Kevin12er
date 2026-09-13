import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator'

export class CreateCourseDto {

    @ApiProperty({
        example: 'Pemrograman NestJS Dasar',
        description: 'Judul kelas yang akan dibuat'
    })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({
        example: 'Belajar REST API',
        description: 'Deskripsi lengkap kelas'
    })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({
        example: 0,
        description: 'Kelas Gratis'
    })
    @IsNumber()
    @Min(0)
    price: number;
}

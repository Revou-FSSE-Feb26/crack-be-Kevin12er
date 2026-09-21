import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export enum CreateTaskOptions {
    MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
    ESSAY = 'ESSAY'
}

export class CreateTaskDto {
    @ApiProperty({
        example: 'Kuis Logika Dasar Matematika',
        description: 'Judul dari tugas atau kuis',
    })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({
        example: 'Kerjakan soal-soal pilihan ganda berikut dengan cermat.',
        description: 'Deskripsi petunjuk pengerjaan tugas',
    })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({
        enum: CreateTaskOptions,
        example: CreateTaskOptions.MULTIPLE_CHOICE,
        description: 'Tipe soal/tugas (MULTIPLE_CHOICE atau ESSAY)',
    })
    @IsEnum(CreateTaskOptions)
    @IsNotEmpty()
    type: CreateTaskOptions;

    @ApiProperty({
        example: false,
        description: 'Status penanda apakah tugas sudah selesai atau belum',
        default: false,
    })
    @IsBoolean()
    @IsOptional()
    isCompleted?: boolean;
}
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  // 1. Endpoint Create Task
  async create(createTaskDto: CreateTaskDto) {
    return await this.prisma.task.create({
      data: createTaskDto,
    });
  }

  // 2. Endpoint Get All Tasks
  async findAll() {
    return await this.prisma.task.findMany();
  }

  // 3. Endpoint Get Task by ID
  async findOne(id: number) {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException(`Task dengan ID ${id} tidak ditemukan`);
    }

    return task;
  }

  // 4. Endpoint Edit / Update Task
  async update(id: number, updateTaskDto: UpdateTaskDto) {
    try {
      return await this.prisma.task.update({
        where: { id },
        data: updateTaskDto,
      });
    } catch (error) {
      if ((error as any).code === 'P2025') {
        throw new NotFoundException(`Task dengan ID ${id} tidak ditemukan`);
      }
      throw error;
    }
  }

  // 5. Endpoint Delete Task
  async remove(id: number) {
    try {
      const deletedTask = await this.prisma.task.delete({
        where: { id },
      });

      return {
        message: `Task dengan ID ${id} berhasil dihapus`,
        data: deletedTask,
      };
    } catch (error) {
      if ((error as any).code === 'P2025') {
        throw new NotFoundException(`Task dengan ID ${id} tidak ditemukan`);
      }
      throw error;
    }
  }
}
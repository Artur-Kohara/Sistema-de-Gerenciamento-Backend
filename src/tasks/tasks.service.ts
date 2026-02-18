import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from '@prisma/client';

@Injectable()
export class TasksService {
    constructor (private prisma: PrismaService) {}

    async create(dto: CreateTaskDto, projectId: number) {
        return this.prisma.task.create({
            data: {
                title: dto.title,
                status: dto.status ?? 'TODO',
                projectId
            }
        });
    }

    async update(taskId: number, taskStatus: TaskStatus) {
        return this.prisma.task.update({
            where: {id: taskId},
            data: {status: taskStatus},
        });
    }

    delete(taskId: number) {
        return this.prisma.task.delete({
            where: {id: taskId},
        });
    }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { TaskStatus } from '@prisma/client';

@Injectable()
export class ProjectsService {
    constructor (private prisma: PrismaService) {}

    async create(dto: CreateProjectDto, userId:number) {
        return this.prisma.project.create({
            data: {
                name: dto.name,
                users: {
                    connect: {id: userId},
                },
            },
            include: {users: true},
        });
    }

    findAll() {
        return this.prisma.project.findMany({
            include: {users: true}, // Faz com que mostre os usuários de cada projeto
        });
    }

    addUser(projectId: number, userId: number) {
        return this.prisma.project.update({
            where: {id: projectId},
            data: {
                users: {
                    connect: {id: userId},
                },
            },
        });
    }

    removeUser(projectId: number, userId: number) {
        return this.prisma.project.update({
            where: {id: projectId},
            data: {
                users: {
                    disconnect: {id: userId},
                },
            },
        });
    }

    delete(projectId: number) {
        return this.prisma.project.delete({
            where: {id: projectId},
        });
    }
}

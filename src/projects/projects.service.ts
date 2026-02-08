import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProjectsService {
    constructor (private prisma: PrismaService) {}

    create(name: string) {
        return this.prisma.project.create({
            data: {name},
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
        })
    }
}

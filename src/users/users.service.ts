import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
}

@Injectable()
export class UsersService {
    constructor (private prisma: PrismaService) {}

    findAll(){
        return this.prisma.user.findMany();
    }

    create(name: string, email: string, password: string) {
        return this.prisma.user.create({
            data: {name, email, password},
        });
    }

    delete(id: number) {
        return this.prisma.user.delete({
            where: {id},
        });
    }
}

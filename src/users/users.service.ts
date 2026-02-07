import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: Role;
}

@Injectable()
export class UsersService {
    constructor (private prisma: PrismaService) {}

    findAll(){
        return this.prisma.user.findMany();
    }

    async create(name: string, email: string, password: string, role: Role) { // Permite criar admins e managers
        // Faz o hashing da senha com custo computacional 10
        const hashedPassword = await bcrypt.hash(password, 10);

        return this.prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword,
                role: role,
            },
        });
    }

    delete(id: number) {
        return this.prisma.user.delete({
            where: {id},
        });
    }
}

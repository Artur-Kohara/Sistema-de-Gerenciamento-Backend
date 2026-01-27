import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

export interface User {
    id: number;
    name: string;
    email: string;
}

@Injectable()
export class UsersService {
    constructor (private prisma: PrismaService) {}

    findAll(){}
}

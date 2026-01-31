import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor (private prisma: PrismaService) {}

    async register(dto: RegisterDto) {
        // Faz o hashing da senha com custo computacional 10 (quanto maior ele for mais seguro será, porém mais lento)
        const hashedPassword = await bcrypt.hash(dto.password, 10);

        const user = await this.prisma.user.create({
            data: {
                name: dto.name,
                email: dto.email,
                password: hashedPassword,
            },
        });

        // Remove a senha da resposta, garantindo que ela nunca vaze
        const {password, ...result} = user;
        return result;
    }
}

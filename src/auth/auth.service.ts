import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor (
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) {}

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

    async login(dto: LoginDto) {
        const user = await this.prisma.user.findUnique({
            where: {email: dto.email},
        });

        if (!user) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        const passwordMatches = await bcrypt.compare(
            dto.password,
            user.password
        );

        if (!passwordMatches) {
            throw new UnauthorizedException('Senha incorreta');
        }

        const payload = {
            sub: user.id,
            email: user.email,
            name: user.name,
        }

        // Assina o token com o JWT_SECRET
        const token = this.jwtService.sign(payload);

        return {
            access_token: token,
        };
    }
}

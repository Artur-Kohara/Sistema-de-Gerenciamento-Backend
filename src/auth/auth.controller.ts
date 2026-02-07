import { Body, Controller, Post, Get, UseGuards, Req } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor (private readonly authService: AuthService) {}

    @Post('register')
    register(@Body() dto: RegisterDto) {
        return this.authService.register(dto)   // Apenas repassa para o service
    }

    @Post('login')
    login(@Body() dto: LoginDto) {
        return this.authService.login(dto)
    }

    // Essa requisição pega as informações do usuário logado
    @UseGuards(JwtAuthGuard)    // Exige que o usuário esteja logado
    @Get('me')
    getMe(@Req() req) {
        return req.user;
    }
}

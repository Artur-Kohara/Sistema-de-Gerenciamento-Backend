import { Controller, Get, Post, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Role } from '@prisma/client';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
    constructor (private readonly usersService: UsersService) {}

    @Get()
    findAll(){
        return this.usersService.findAll();
    }

    @Post()
    create(
        @Body('name') name: string,
        @Body('email') email: string,
        @Body('password') password: string,
        @Body('role') role: Role,
    ) {
        return this.usersService.create(name, email, password, role);
    }

    @UseGuards(JwtAuthGuard)    // Limita essa requisição a usuários logados
    @Roles(Role.ADMIN)  // Limita essa requisição apenas a admins
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.delete(Number(id));
    }
}

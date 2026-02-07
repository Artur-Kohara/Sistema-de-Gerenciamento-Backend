import { Controller, Get, Post, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Role } from '@prisma/client';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)    // Limita essaa ações a admins logados
@Roles(Role.ADMIN)
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

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.delete(Number(id));
    }
}

import { Body, Controller, Get, Param, Post, UseGuards, Patch, Delete, Req } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { CreateProjectDto } from './dto/create-project.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('projects')
export class ProjectsController {
    constructor (private projectsService: ProjectsService) {}

    @Roles(Role.ADMIN, Role.MANAGER)
    @Post()
    create(@Body() dto: CreateProjectDto, @Req() req) {
        const userId = req.user.id; // Busca o id do usuário no JWT
        return this.projectsService.create(dto, userId)
    }

    @Roles(Role.ADMIN)
    @Get()
    findAll() {
        return this.projectsService.findAll();
    }

    @Roles(Role.ADMIN, Role.MANAGER)
    @Post(':projectId/users/:userId')
    addUser(@Param('projectId') projectId: string, @Param('userId') userId: string) {
        return this.projectsService.addUser(Number(projectId), Number(userId));
    }

    @Roles(Role.ADMIN, Role.MANAGER)
    @Patch(':projectId/users/:userId')
    removeUser(@Param('projectId') projectId: string, @Param('userId') userId: string) {
        return this.projectsService.removeUser(Number(projectId), Number(userId));
    }

    @Roles(Role.ADMIN, Role.MANAGER)
    @Delete(':projectId')
    delete(@Param('projectId') projectId: string) {
        return this.projectsService.delete(Number(projectId));
    }
}

import { Body, Controller, Delete, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreateTaskDto } from './dto/create-task.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role, TaskStatus } from '@prisma/client';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('tasks')
export class TasksController {
    constructor (private tasksService: TasksService) {}

    @Roles(Role.MANAGER, Role.ADMIN)
    @Post(':projectId')
    create(@Body() dto: CreateTaskDto, @Param('projectId') projectId: string) {
        return this.tasksService.create(dto, Number(projectId));
    }

    @Patch(':taskId')
    update(@Param('taskId') taskId: string, @Body('taskStatus') taskStatus: TaskStatus) {
        return this.tasksService.update(Number(taskId), taskStatus);
    }

    @Roles(Role.ADMIN, Role.MANAGER)
    @Delete(':taskId')
    delete(@Param('taskId') taskId: string) {
        return this.tasksService.delete(Number(taskId));
    }
}

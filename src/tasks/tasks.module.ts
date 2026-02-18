import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [TasksService, PrismaService],
  controllers: [TasksController]
})
export class TasksModule {}

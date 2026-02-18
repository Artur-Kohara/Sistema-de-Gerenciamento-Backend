import { TaskStatus } from "@prisma/client";

export class CreateTaskDto {
    title: string;
    status?: TaskStatus;
}
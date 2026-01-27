import { Injectable } from '@nestjs/common';

export interface User {
    id: number;
    name: string;
    email: string;
}

@Injectable()
export class UsersService {}

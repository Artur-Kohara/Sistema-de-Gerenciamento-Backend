import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor (private readonly usersService: UsersService) {}

    @Get()
    findAll(){
        return this.usersService.findAll();
    }

    @Post()
    create(@Body('name') name: string, @Body('email') email: string, @Body('password') password: string) {
        return this.usersService.create(name, email, password);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.delete(Number(id));
    }
}

import { BadRequestException, Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';

import { UserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {

    constructor(private userService: UserService) {}

    @Get()
    getUsers(): string {
        return 'Hello users!';
    }

    @Get(':id')
    getUser() {}

    @Post()
    async createUser(@Body() userDto: UserDto) {
        try {
            await this.userService.createUser(userDto);
        } catch (err) {
            console.log(err);
            throw new BadRequestException();
        }
        
    }

    @Put(':id')
    updateUser() {}

    @Delete(':id')
    deleteUser() {}

    @Post('/auth/login')
    login(): void {}

    @Post('/auth/logout')
    logout(): void {}
}

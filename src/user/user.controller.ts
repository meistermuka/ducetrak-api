import { isEmpty } from 'lodash';

import {
  BadRequestException, NotFoundException, Body, Controller, Delete, Get, Post, Put, Param
} from '@nestjs/common';

import { UserDto } from './user.dto';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('users')
export class UserController {

    constructor(private userService: UserService) {}

    @Get(':userName')
    async getUser(@Param('userName') userName: string): Promise<User> {
      try {
        const user = await this.userService.getUser(userName);
        if(isEmpty(user)) {
          throw new NotFoundException();
        }
        return user;
      } catch (err) {
        console.log(err);
        throw new BadRequestException();
      }
    }

    @Post()
    async createUser(@Body() userDto: UserDto): Promise<void> {
      try {
        await this.userService.createUser(userDto);
      } catch (err) {
        console.log(err);
        throw new BadRequestException();
      }
    }

    @Put(':id')
    updateUser() {}

    @Delete(':userName')
    async deleteUser(@Param('userName') userName: string): Promise<void> {
      try {
        await this.userService.deleteUser(userName);
      } catch (err) {
        console.log(err);
        throw new BadRequestException();
      }
    }

    @Post('/auth/login')
    login(): void {}

    @Post('/auth/logout')
    logout(): void {}
}

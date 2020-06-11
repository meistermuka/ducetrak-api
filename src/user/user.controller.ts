import {
  BadRequestException, Body, Controller, Delete, Get, Post,
  Put, Param, UseInterceptors, ClassSerializerInterceptor, UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { UserDto } from './user.dto';
import { UserService } from './user.service';
import { User } from './user.entity';

/*
  The @UseInterceptors(ClassSerializerInterceptor) decorator is used
  to exclude properties we don't want to share with the caller.
  Here we are excluding password and id. See User entity definition
*/
@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UserController {

  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAllUsers(): Promise<User[]> {
    try {
      return await this.userService.getAllUsers();
    } catch (err) {
      // TODO: Proper logging of errors
      console.log(err);
      throw new BadRequestException();
    }
  }

  @Get(':userName')
  async getUser(@Param('userName') userName: string): Promise<User> {
    try {
      return await this.userService.getUser(userName);
    } catch (err) {
      console.log(err);
      throw new BadRequestException();
    }
  }

  @Post()
  async createUser(@Body() userDto: UserDto): Promise<User> {
    try {
      return await this.userService.createUser(userDto);
    } catch (err) {
      console.log(err);
      throw new BadRequestException();
    }
  }

  @Put(':username')
  async updateUser(@Param('username') username: string, @Body() userDto: UserDto): Promise<User> {
    try {
      return await this.userService.updateUser(username, userDto);
    } catch (err) {
      console.log(err);
      throw new BadRequestException();
    }
  }

  @Delete(':userName')
  async deleteUser(@Param('userName') userName: string): Promise<User> {
    try {
      return await this.userService.deleteUser(userName);
    } catch (err) {
      console.log(err);
      throw new BadRequestException();
    }
  }
}

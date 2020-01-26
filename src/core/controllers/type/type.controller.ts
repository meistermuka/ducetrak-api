import {
  Body, Controller, Get, BadRequestException, Param, Post, Put, Delete
} from '@nestjs/common';

import { Type } from '../../../core/entities/type.entity';
import { TypeDto } from '../../dto/type.dto';
import { TypeService } from '../../services';

@Controller('types')
export class TypeController {

  constructor(private typeService: TypeService) {}

  @Get()
  async getAllTypes(): Promise<Type[]> {
    try {
      return await this.typeService.getAllTypes();
    } catch (err) {
      console.log(err);
      throw new BadRequestException();
    }
  }

  @Get(':id')
  async getType(@Param('id') id: number): Promise<Type> {
    try {
      return await this.typeService.getType(id);
    } catch (err) {
      console.log(err);
      throw new BadRequestException();
    }
  }

  @Post()
  async postType(@Body() typeDto: TypeDto): Promise<Type> {
    try {
      return await this.typeService.postType(typeDto);
    } catch (err) {
      console.log(err);
      throw new BadRequestException();
    }
  }

  @Put(':id')
  async updateType(@Param('id') id: number, @Body() typeDto: TypeDto): Promise<Type> {
    try {
      return await this.typeService.updateType(id, typeDto);
    } catch (err) {
      console.log(err);
      throw new BadRequestException();
    }
  }

  @Delete(':name')
  async deleteType(@Param('name') name: string): Promise<Type> {
    try {
      return await this.typeService.deleteType(name);
    } catch (err) {
      console.log(err);
      throw new BadRequestException();
    }
  }
}

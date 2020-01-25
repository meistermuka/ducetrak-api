import { isEmpty } from 'lodash';

import { Body, Controller, Get, NotFoundException, Param, Post, Put, Delete } from '@nestjs/common';

import { Type } from '../../../core/entities/type.entity';
import { TypeDto } from '../../dto/type.dto';
import { TypeService } from '../../services';

@Controller('types')
export class TypeController {

    constructor(private typeService: TypeService) {}

    @Get()
    async getAllTypes(): Promise<Type[]> {
        return await this.typeService.getAllTypes();
    }

    @Get(':id')
    async getType(@Param('id') id: number): Promise<Type> {
        const type = await this.typeService.getType(id);
        if(type.isDeleted()) {
            throw new NotFoundException();
        } else {
            return type;
        }
    }

    @Post()
    async postType(@Body() typeDto: TypeDto): Promise<Type> {
        const newType = await this.typeService.postType(typeDto);
        return newType;
    }

    @Put(':id')
    async updateType(@Param('id') id: number, @Body() typeDto: TypeDto): Promise<Type> {
      return await this.typeService.updateType(id, typeDto);
    }

    @Delete(':name')
    async deleteType(@Param('name') name: string): Promise<Type> {
      return await this.typeService.deleteType(name);
    }
}

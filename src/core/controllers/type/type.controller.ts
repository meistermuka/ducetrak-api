import { Controller, Get, Post, Body, Put, Param, NotFoundException, Delete } from '@nestjs/common';
import { TypeService } from '../../services';
import { Type } from '../../../core/entities/type.entity';
import { CreateTypeDto } from '../../dto/type.dto';

import { isEmpty } from 'lodash';

@Controller('types')
export class TypeController {

    constructor(private typeService: TypeService) {}

    @Get()
    getAllTypes(): Promise<Type[]> {
        return this.typeService.getAllTypes();
    }

    @Get(':id')
    async getType(@Param('id') id: number): Promise<Type> {
        const theType = await this.typeService.getType(id);
        if (isEmpty(theType)) {
            throw new NotFoundException();
        } else {
            return theType;
        }
    }

    @Post()
    postType(@Body() createTypeDto: CreateTypeDto): void {
        this.typeService.postType(createTypeDto);
    }
}

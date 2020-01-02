import { isEmpty } from 'lodash';

import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';

import { Type } from '../../../core/entities/type.entity';
import { TypeDto } from '../../dto/type.dto';
import { TypeService } from '../../services';

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
    async postType(@Body() typeDto: TypeDto): Promise<void> {
        await this.typeService.postType(typeDto);
    }
}

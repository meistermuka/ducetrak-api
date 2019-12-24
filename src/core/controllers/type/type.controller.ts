import { Controller, Get, Post, Body, Put, Param } from '@nestjs/common';
import { TypeService } from '../../services';
import { Type } from '../../../core/entities/type.entity';
import { CreateTypeDto } from '../../dto/type.dto';

@Controller('types')
export class TypeController {

    constructor(private typeService: TypeService) {}

    @Get()
    getAllTypes(): Promise<Type[]> {
        return this.typeService.getAllTypes();
    }

    @Get(':id')
    getType(@Param('id') id: number): Promise<Type> {
        return this.typeService.getType(id);
    }

    @Post()
    postType(@Body() createTypeDto: CreateTypeDto): void {
        this.typeService.postType(createTypeDto);
    }

    @Put()
    updateType(@Body() createTypeDto: CreateTypeDto): void {}

    deleteType(): void {}
}

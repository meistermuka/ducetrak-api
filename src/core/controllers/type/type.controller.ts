import { Controller, Get, Post, Body } from '@nestjs/common';
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

    @Post()
    postType(@Body() createTypeDto: CreateTypeDto): void {
        this.typeService.postType(createTypeDto);
    }
}

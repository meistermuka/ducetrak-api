import { Injectable } from '@nestjs/common';
import { Type } from '../../../core/entities/type.entity';
import { CreateTypeDto } from '../../dto/type.dto';

@Injectable()
export class TypeService {

    async getAllTypes(): Promise<Type[]> {
        return await Type.find();
    }

    async postType(typeDto: CreateTypeDto): Promise<void> {
        //Type.insert()
        const type = new Type();
        type.name = typeDto.name;
        await type.save();
    }
}

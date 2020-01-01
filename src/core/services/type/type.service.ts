import { Injectable } from '@nestjs/common';

import { Type } from '../../../core/entities/type.entity';
import { TypeDto } from '../../dto/type.dto';

@Injectable()
export class TypeService {

    async getAllTypes(): Promise<Type[]> {
        return await Type.find();
    }

    async getType(id: number): Promise<Type> {
        return await Type.findOne({ id});
    }

    async postType(typeDto: TypeDto): Promise<void> {
        const type = new Type();
        type.name = typeDto.name;
        await type.save();
    }
}

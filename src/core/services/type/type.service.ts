import { isEmpty } from 'lodash';
import { Injectable } from '@nestjs/common';

import { Type } from '../../../core/entities/type.entity';
import { TypeDto } from '../../dto/type.dto';

@Injectable()
export class TypeService {

    async getAllTypes(): Promise<Type[]> {
        return await Type.find();
    }

    async getType(id: number): Promise<Type> {
        return await Type.findOne({ id });
    }

    async postType(typeDto: TypeDto): Promise<Type> {
        const type = new Type();
        type.name = typeDto.name;
        await type.save();
        return type;
    }

    async updateType(id: number, typeDto: TypeDto): Promise<Type> {
      const type = await Type.findOne({ id });
      if(type.isDeleted()) {
        throw new Error('No Type found');
      }
      type.name = typeDto.name;
      await type.save();

      return type;
    }

    async deleteType(name: string): Promise<void> {
      const type = await Type.findOne({ name });
      if(type.isDeleted()) {
        throw new Error('Type already deleted');
      }
      type.deleted = true;
      await type.save();
    }
}

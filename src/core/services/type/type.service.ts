import { isEmpty } from 'lodash';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Type } from '../../../core/entities/type.entity';
import { TypeDto } from '../../dto/type.dto';

@Injectable()
export class TypeService {

  constructor(@InjectRepository(Type) private readonly typeRepository: Repository<Type>) {}

    async getAllTypes(): Promise<Type[]> {
        return await this.typeRepository.find();
    }

    async getType(id: number): Promise<Type> {
        const type = await this.typeRepository.findOne({ id });
        if(type.isDeleted()) {
          throw new Error('No Type Found');
        }
        return type;
    }

    async postType(typeDto: TypeDto): Promise<Type> {
        const type = new Type();
        type.name = typeDto.name;
        await this.typeRepository.save(type);
        return type;
    }

    async updateType(id: number, typeDto: TypeDto): Promise<Type> {
      const type = await this.typeRepository.findOne({ id });
      if(type.isDeleted()) {
        throw new Error('No Type found');
      }
      type.name = typeDto.name;
      await this.typeRepository.save(type);

      return type;
    }

    async deleteType(name: string): Promise<void> {
      const type = await this.typeRepository.findOne({ name });
      if(type.isDeleted()) {
        throw new Error('Type already deleted');
      }
      type.deleted = true;
      await this.typeRepository.save(type);
    }
}

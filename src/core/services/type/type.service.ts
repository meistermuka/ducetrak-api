import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Type } from '../../../core/entities/type.entity';
import { NoTypeFoundError, TypeAlreadyDeleted } from './type.errors';
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
        throw new NoTypeFoundError();
      }
      return type;
    }

    async postType(typeDto: TypeDto): Promise<Type> {
        const type = new Type();
        type.name = typeDto.name;
        return await this.typeRepository.save(type);
    }

    async updateType(id: number, typeDto: TypeDto): Promise<Type> {
      const type = await this.typeRepository.findOne({ id });
      if(type.isDeleted()) {
        throw new NoTypeFoundError();
      }
      type.name = typeDto.name;
      return await this.typeRepository.save(type);
    }

    async deleteType(name: string): Promise<Type> {
      const type = await this.typeRepository.findOne({ name });
      if(type.isDeleted()) {
        throw new TypeAlreadyDeleted();
      }
      type.deleted = true;
      return await this.typeRepository.save(type);
    }
}

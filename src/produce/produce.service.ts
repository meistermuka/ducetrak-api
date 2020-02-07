import { isEmpty } from 'lodash';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Type } from '../core/entities/type.entity';
import { Location } from '../location/location.entity';
import { PriceService } from '../price/price.service';
import { User } from '../user/user.entity';
import { ProduceDto } from './produce.dto';
import { Produce } from './produce.entity';
import {
  filterUserRelation, RequiredFieldsError, NoLocationFoundError, NoUserFoundError,
  NoTypeFoundError, NoPriceFoundError, UpdatePriceError, NoProduceFoundError
} from '../shared';

@Injectable()
export class ProduceService {

  constructor(
    private priceService: PriceService,
    @InjectRepository(Location) private readonly locationRepository: Repository<Location>,
    @InjectRepository(Produce) private readonly produceRepository: Repository<Produce>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Type) private readonly typeRepository: Repository<Type>,
  ) {}

  private async _getProduce(id: number): Promise<Produce> {
    const produce = await this.produceRepository.findOne({ id }, { relations: ['location', 'user', 'type', 'price'] });
    if(produce.isDeleted() || isEmpty(produce)) {
      throw new Error('No Produce Found');
    }
    return produce;
  }

  async getProduce(id: number): Promise<Produce> {
    return await this._getProduce(id);
  }

  async getAllProduce(): Promise<Produce[]> {
    return await this.produceRepository.find({ relations: ['location', 'user', 'type', 'price'] });
  }

  private async createOrUpdateProduce(produce: Produce, produceDto: ProduceDto): Promise<void> {

    if(Number.isInteger(produceDto.location)) {
      const location = await this.locationRepository.findOne({ id: produceDto.location });
      if(isEmpty(location)) {
          throw new NoLocationFoundError();
      }
      produce.location = location;
    }

    if(Number.isInteger(produceDto.user)) {
      const user = await this.userRepository.findOne({ id: produceDto.user });
      if(isEmpty(user)) {
          throw new NoUserFoundError();
      }
      produce.user = user;
    }

    if(Number.isInteger(produceDto.type)) {
      const type = await this.typeRepository.findOne({ id: produceDto.type });
      if(isEmpty(type)) {
          throw new NoTypeFoundError();
      }
      produce.type = type;
    }
  }

  async postProduce(produceDto: ProduceDto): Promise<Produce> {
    const produce = new Produce();
    const requiredFields = ['type', 'user', 'location', 'name', 'price'];
    const produceDtoKeys = Object.keys(produceDto);
    const missingFields = produceDtoKeys.filter(key => !requiredFields.includes(key));

    if(isEmpty(produceDto)) {
      throw new RequiredFieldsError(requiredFields);
    }

    if(missingFields.length) {
      throw new RequiredFieldsError(missingFields);
    }

    produce.name = produceDto.name;

    await this.createOrUpdateProduce(produce, produceDto);

    const insertedProduce = await this.produceRepository.save(produce);

    const produceId = insertedProduce.id;
    const user = insertedProduce.user;

    if (isEmpty(produceDto.price)) {
      throw new NoPriceFoundError();
    }

    try {
      await this.priceService.postPrice(produceId, user, produceDto.price);
    } catch (e) {
      console.log(e);
    }

    const newProduce = await this._getProduce(produceId);
    filterUserRelation(newProduce);
    return newProduce;
  }

  async updateProduce(id: number, produceDto: ProduceDto): Promise<Produce> {
    const produce = await this.produceRepository.findOne({ id }, { relations: ['location', 'user', 'type'] });
    await this.createOrUpdateProduce(produce, produceDto);

    if(!isEmpty(produceDto.price)) {
      try {
        await this.priceService.updatePrice(id, produce.user, produceDto.price);
      } catch (e) {
        console.log(e);
        throw new UpdatePriceError();
      }
    }
    const updatedProduce = await this.produceRepository.save(produce);
    filterUserRelation(updatedProduce);
    return updatedProduce;
  }

  async deleteProduce(id: number): Promise<Produce> {
    const produce = await this.produceRepository.findOne({id})
    if(isEmpty(produce)) {
      throw new NoProduceFoundError();
    }
    produce.deleted = true;
    return await this.produceRepository.save(produce);
  }
}

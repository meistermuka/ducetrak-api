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

@Injectable()
export class ProduceService {

  constructor(
    private priceService: PriceService,
    @InjectRepository(Location) private readonly locationRepository: Repository<Location>,
    @InjectRepository(Produce) private readonly produceRepository: Repository<Produce>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Type) private readonly typeRepository: Repository<Type>,
  ) {}

  async getProduce(id: number): Promise<Produce> {
    const produce = await this.produceRepository.findOne({ id }, { relations: ['location', 'user', 'type', 'price'] });
    if(produce.isDeleted || isEmpty(produce)) {
      throw new Error('No Produce Found');
    }
    return produce;
  }

  async getAllProduce(): Promise<Produce[]> {
    return await this.produceRepository.find({ relations: ['location', 'user', 'type', 'price'] });
  }

  private async createOrUpdateProduce(produce: Produce, produceDto: ProduceDto): Promise<void> {
    produce.name = produceDto.name;

    if(!isEmpty(produceDto.location)) {
      const location = await this.locationRepository.findOne({ id: produceDto.location });
      if(isEmpty(location)) {
          throw new Error('No Location Found');
      }
      produce.location = location;
    }

    if(!isEmpty(produceDto.user)) {
      const user = await this.userRepository.findOne({ id: produceDto.user });
      if(isEmpty(user)) {
          throw new Error('No User Found');
      }
      produce.user = user;
    }

    if(!isEmpty(produceDto.type)) {
      const type = await this.typeRepository.findOne({ id: produceDto.type });
      if(isEmpty(type)) {
          throw new Error('No Type Found');
      }
      produce.type = type;
    }
  }

  async postProduce(produceDto: ProduceDto): Promise<void> {
    const produce = new Produce();

    await this.createOrUpdateProduce(produce, produceDto);

    const insertedProduce = await this.produceRepository.save(produce);

    const produceId = insertedProduce.id;
    const user = insertedProduce.user;

    if (isEmpty(produceDto.price)) {
        throw new Error('No Price Found');
    }

    try {
      await this.priceService.postPrice(produceId, user, produceDto.price);
    } catch (e) {
      console.log(e);
    }

  }

  async updateProduce(id: number, produceDto: ProduceDto): Promise<Produce> {
    const produce = await this.produceRepository.findOne({ id }, { relations: ['location', 'user', 'type'] });
    await this.createOrUpdateProduce(produce, produceDto);

    if(!isEmpty(produceDto.price)) {
      try {
        await this.priceService.updatePrice(id, produce.user, produceDto.price);
      } catch (e) {
        console.log(e);
        throw new Error('Update Price Failed');
      }
    }
    return await this.produceRepository.save(produce);
  }

  async deleteProduce(id: number): Promise<Produce> {
    const produce = await this.produceRepository.findOne({id})
    if(isEmpty(produce)) {
      throw new Error('No Produce Found');
    }
    produce.deleted = true;
    return await this.produceRepository.save(produce);
  }
}

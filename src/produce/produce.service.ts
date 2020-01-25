import { isEmpty } from 'lodash';

import { Injectable } from '@nestjs/common';

import { Type } from '../core/entities/type.entity';
import { Location } from '../location/location.entity';
import { PriceService } from '../price/price.service';
import { User } from '../user/user.entity';
import { ProduceDto } from './produce.dto';
import { Produce } from './produce.entity';

@Injectable()
export class ProduceService {

    constructor(private priceService: PriceService) {}

    async getProduce(id: number): Promise<Produce> {
      return await Produce.findOne({ id }, { relations: ['location', 'user', 'type', 'price'] });
    }

    async getAllProduce(): Promise<Produce[]> {
      return await Produce.find({ relations: ['location', 'user', 'type'] });
    }

    private async createOrUpdateProduce(produce: Produce, produceDto: ProduceDto): Promise<void> {
      produce.name = produceDto.name;

      if(!isEmpty(produceDto.location)) {
        const location = await Location.findOne({ id: produceDto.location });
        if(isEmpty(location)) {
            throw new Error('No Location Found');
        }
        produce.location = location;
      }

      if(!isEmpty(produceDto.user)) {
        const user = await User.findOne({ id: produceDto.user });
        if(isEmpty(user)) {
            throw new Error('No User Found');
        }
        produce.user = user;
      }

      if(!isEmpty(produceDto.type)) {
        const type = await Type.findOne({ id: produceDto.type });
        if(isEmpty(type)) {
            throw new Error('No Type Found');
        }
        produce.type = type;
      }
    }

    async postProduce(produceDto: ProduceDto): Promise<void> {
      const produce = new Produce();

      await this.createOrUpdateProduce(produce, produceDto);

      produce.createdDate = new Date().toISOString();
      produce.modifiedDate = new Date().toISOString();

      const insertedProduce = await produce.save();

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

    async updateProduce(id: number, produceDto: ProduceDto): Promise<void> {
      const produce = await Produce.findOne({ id }, { relations: ['location', 'user', 'type'] });
      await this.createOrUpdateProduce(produce, produceDto);
      produce.modifiedDate = new Date().toISOString();

      if(!isEmpty(produceDto.price)) {
        try {
          await this.priceService.updatePrice(id, produce.user, produceDto.price);
        } catch (e) {
          console.log(e);
        }
      }
      produce.save();
    }

    async deleteProduce(id: number): Promise<void> {
      const produce = await Produce.findOne({id})
      if(isEmpty(produce)) {
        throw new Error('No Produce Found');
      }
      await Produce.delete({ id });
    }
}

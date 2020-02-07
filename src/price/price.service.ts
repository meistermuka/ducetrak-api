import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Produce } from '../produce/produce.entity';
import { User } from '../user/user.entity';
import { PriceDto } from './price.dto';
import { Price } from './price.entity';

@Injectable()
export class PriceService {

  constructor(
    @InjectRepository(Produce) private readonly produceRepository: Repository<Produce>,
    @InjectRepository(Price) private readonly priceRepository: Repository<Price>) {}

  async postPrice(produceId: number, user: User, priceDto: PriceDto): Promise<Price> {
    const price = new Price();
    price.produce = await this.produceRepository.findOne({ id: produceId });
    price.price = priceDto.price;
    price.unit = priceDto.unit;
    price.user = user;

    return await this.priceRepository.save(price);
  }

  async updatePrice(produceId: number, user: User, priceDto: PriceDto): Promise<Price> {
    const price = new Price();
    const produce = await this.produceRepository.findOne({ id: produceId}, { relations: ['price']});
    const oldPrice = await this.priceRepository.findOne({ id: produce.price[0].id });
    oldPrice.deleted = true;
    await this.priceRepository.save(oldPrice);

    price.produce = produce;
    price.price = priceDto.price;
    price.unit = priceDto.unit;
    price.user = user;
    return await this.priceRepository.save(price);
  }
}

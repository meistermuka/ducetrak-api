import { Produce } from 'src/produce/produce.entity';

import { Injectable } from '@nestjs/common';

import { User } from '../user/user.entity';
import { PriceDto } from './price.dto';
import { Price } from './price.entity';

@Injectable()
export class PriceService {

    async postPrice(produceId: number, user: User, priceDto: PriceDto): Promise<void> {
        const price = new Price();
        price.produce = await Produce.findOne({ id: produceId });
        price.price = priceDto.price;
        price.unit = priceDto.unit;
        price.user = user;
        price.createdDate = new Date().toISOString();
        price.active = true;

        await price.save();
    }
}
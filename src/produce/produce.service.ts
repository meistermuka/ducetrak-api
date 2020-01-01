import { isEmpty } from 'lodash';

import { Injectable } from '@nestjs/common';

import { Type } from '../core/entities/type.entity';
import { Location } from '../location/location.entity';
import { User } from '../user/user.entity';
import { ProduceDto } from './produce.dto';
import { Produce } from './produce.entity';

@Injectable()
export class ProduceService {

    async getProduce(id: number): Promise<Produce> {
        return await Produce.findOne({ id }, { relations: ['location', 'user', 'type'] });
    }

    async getAllProduce(): Promise<Produce[]> {
        return await Produce.find({ relations: ['location', 'user', 'type'] });
    }

    private async createOrUpdateProduce(produce: Produce, produceDto: ProduceDto): Promise<void> {
        produce.name = produceDto.name;

        const location = await Location.findOne({ id: produceDto.location });
        if(isEmpty(location)) {
            throw new Error('No Location Found');
        }
        produce.location = location;

        const user = await User.findOne({ id: produceDto.user });
        if(isEmpty(user)) {
            throw new Error('No User Found');
        }
        produce.user = user;

        const type = await Type.findOne({ id: produceDto.type });
        if(isEmpty(type)) {
            throw new Error('No Type Found');
        }
        produce.type = type;

    }

    async postProduce(produceDto: ProduceDto): Promise<void> {
        const produce = new Produce();

        await this.createOrUpdateProduce(produce, produceDto);

        produce.createdDate = new Date().toISOString();
        produce.modifiedDate = new Date().toISOString();
        
        produce.save();
    }

    async updateProduce(id: number, produceDto: ProduceDto): Promise<void> {
        const produce = await Produce.findOne({ id }, { relations: ['location', 'user', 'type'] });
        await this.createOrUpdateProduce(produce, produceDto);
        produce.modifiedDate = new Date().toISOString();

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

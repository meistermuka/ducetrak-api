import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Type as TypeEntity } from '../../entities/type.entity';
import { Produce as ProduceEntity } from '../../../produce/produce.entity';
import { Location as LocationEntity } from '../../../location/location.entity';
import { Price as PriceEntity } from '../../../price/price.entity';
import { User as UserEntity } from '../../../user/user.entity';

import * as dotenv from 'dotenv';
import * as fs from 'fs';

@Injectable()
export class ConfigService {
    private readonly envConfig: Record<string, string>;

    constructor(filePath: string) {
        this.envConfig = dotenv.parse(fs.readFileSync(filePath));
    }

    get(key: string): string {
        return this.envConfig[key];
    }

    public getTypeOrmConfig(): TypeOrmModuleOptions {
        return {
            type: 'postgres',
            host: this.get('TYPEORM_HOST'),
            port: parseInt(this.get('TYPEORM_PORT'), 10),
            username: this.get('TYPEORM_USERNAME'),
            password: this.get('TYPEORM_PASSWORD'),
            database: this.get('TYPEORM_DATABASE'),
            synchronize: true,
            entities: [TypeEntity, ProduceEntity, LocationEntity, PriceEntity, UserEntity],
        };
    }
}

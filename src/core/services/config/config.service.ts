import * as dotenv from 'dotenv';
import * as fs from 'fs';

import * as Joi from '@hapi/joi';
import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { Location as LocationEntity } from '../../../location/location.entity';
import { Price as PriceEntity } from '../../../price/price.entity';
import { Produce as ProduceEntity } from '../../../produce/produce.entity';
import { User as UserEntity } from '../../../user/user.entity';
import { Type as TypeEntity } from '../../entities/type.entity';

export type EnvConfig = Record<string, string>;

@Injectable()
export class ConfigService {
    private readonly envConfig: EnvConfig;

    constructor(filePath: string) {
        const config = dotenv.parse(fs.readFileSync(filePath));
        this.envConfig = this.validateInput(config);
    }

    private validateInput(envConfig: EnvConfig): EnvConfig {
        const envVarsSchema: Joi.ObjectSchema = Joi.object({
            NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
            TYPEORM_HOST: Joi.string().required(),
            TYPEORM_USERNAME: Joi.string().required(),
            TYPEORM_PASSWORD: Joi.string().required(),
            TYPEORM_DATABASE: Joi.string().required(),
            TYPEORM_PORT: Joi.number().required(),
            TYPEORM_MIGRATION_TABLE: Joi.string(),
        });

        const { error, value: validateEnvConfig } = envVarsSchema.validate(envConfig);

        if (error) {
            throw new Error(`Config validation error: ${error.message}`);
        }

        return validateEnvConfig;
    }

    get(key: string): string {
        return this.envConfig[key];
    }

    get env() {
        return this.envConfig;
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
            migrationsTableName: this.get('TYPEORM_MIGRATION_TABLE'),
            migrations: ['migration/*.ts'],
            cli: {
                migrationsDir: 'migration',
            }
        };
    }
}

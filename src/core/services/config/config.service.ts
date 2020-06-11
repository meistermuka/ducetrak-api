import * as dotenv from 'dotenv';
import * as fs from 'fs';

import * as Joi from '@hapi/joi';
import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { Location as LocationEntity } from '../../../location/location.entity';
import { Price as PriceEntity } from '../../../price/price.entity';
import { Produce as ProduceEntity } from '../../../produce/produce.entity';
import { User as UserEntity } from '../../../user/user.entity';
import { Role as RoleEntity } from '../../entities/role.entity';
import { Type as TypeEntity } from '../../entities/type.entity';

export type EnvConfig = Record<string, string>;

@Injectable()
export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(filePath: string) {
    let config = {};

    console.log(`FILE PATH: ${filePath}`);

    if(fs.existsSync(filePath)) {
      config = dotenv.parse(fs.readFileSync(filePath));
    } else {
      config = dotenv.config().parsed;
    }

    console.log(`CONFIG: ${JSON.stringify(config, null, 2)}`);

    this.envConfig = this.validateInput(config);
  }

  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      HMAC_KEY: Joi.string().required(),
      TOKEN_SECRET: Joi.string().required(),
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
    const SOURCE_PATH = process.env.NODE_ENV === 'production' ? 'dist' : 'src';

    return {
      type: 'postgres',
      host: this.get('TYPEORM_HOST'),
      port: parseInt(this.get('TYPEORM_PORT'), 10),
      username: this.get('TYPEORM_USERNAME'),
      password: this.get('TYPEORM_PASSWORD'),
      database: this.get('TYPEORM_DATABASE'),
      synchronize: true,
      entities: [TypeEntity, ProduceEntity, LocationEntity, PriceEntity, UserEntity, RoleEntity],
      migrationsTableName: this.get('TYPEORM_MIGRATION_TABLE'),
      migrations: [`./${SOURCE_PATH}/migration/*{.ts,.js}`],
      cli: {
          migrationsDir: 'migration',
      },
      extra: {
        ssl: true,
      }
    };
  }
}

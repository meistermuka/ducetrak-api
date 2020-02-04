import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PriceService } from '../price/price.service';
import { ProduceController } from './produce.controller';
import { ProduceService } from './produce.service';
import { Produce as ProduceEntity } from './produce.entity';
import { Location as LocationEntity } from '../location/location.entity';
import { User as UserEntity } from '../user/user.entity';
import { Type as TypeEntity } from '../core/entities/type.entity';

@Module({
  controllers: [ProduceController],
  providers: [PriceService, ProduceService],
  imports: [
    TypeOrmModule.forFeature([LocationEntity, ProduceEntity, UserEntity, TypeEntity]),
  ]
})
export class ProduceModule { }

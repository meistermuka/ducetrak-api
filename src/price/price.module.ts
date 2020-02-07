import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PriceController } from './price.controller';
import { PriceService } from './price.service';
import { Price as PriceEntity } from './price.entity';
import { Produce as ProduceEntity } from '../produce/produce.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProduceEntity, PriceEntity]),
  ],
  controllers: [PriceController],
  providers: [PriceService]
})
export class PriceModule {}

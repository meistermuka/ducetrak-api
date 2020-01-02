import { Module } from '@nestjs/common';

import { PriceService } from '../price/price.service';
import { ProduceController } from './produce.controller';
import { ProduceService } from './produce.service';

@Module({
  controllers: [ProduceController],
  providers: [PriceService, ProduceService],
})
export class ProduceModule { }

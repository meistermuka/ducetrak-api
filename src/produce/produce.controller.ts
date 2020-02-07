import { isEmpty } from 'lodash';

import {
    BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put
} from '@nestjs/common';

import { ProduceDto } from './produce.dto';
import { Produce } from './produce.entity';
import { ProduceService } from './produce.service';

@Controller('produce')
export class ProduceController {

  constructor(private produceService: ProduceService) {}

  @Get()
  async getAllProduce(): Promise<Produce[]> {
    const allProduce = await this.produceService.getAllProduce();
    if(allProduce.length === 0) {
      throw new NotFoundException();
    }
    return allProduce;
  }

  @Get(':id')
  async getProduce(@Param('id') id: number): Promise<Produce> {
    const produce = await this.produceService.getProduce(id);
    if(isEmpty(produce)) {
      throw new NotFoundException();
    }
    return produce;
  }

  @Post()
  async postProduce(@Body() produceDto: ProduceDto): Promise<Produce> {
    try {
      return await this.produceService.postProduce(produceDto);
    } catch (e) {
      console.log(e);
      throw new BadRequestException();
    }
  }

  @Put(':id')
  async updateProduce(@Param('id') id: number, @Body() produceDto: ProduceDto): Promise<void> {
    try {
      await this.produceService.updateProduce(id, produceDto);
    } catch (e) {
      console.log(e);
      throw new BadRequestException();
    }
  }

  @Delete(':id')
  async deleteProduce(@Param('id') id: number): Promise<void> {
    try {
      await this.produceService.deleteProduce(id);
    } catch (e) {
      console.log(e);
      throw new BadRequestException();
    }
  }
}

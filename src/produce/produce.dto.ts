import { ApiProperty } from '@nestjs/swagger';

import { PriceDto } from '../price/price.dto';

export class ProduceDto {

    @ApiProperty()
    name: string;
    @ApiProperty()
    type: number;
    @ApiProperty()
    location: number;
    @ApiProperty()
    user: number;
    @ApiProperty()
    price: PriceDto;
}
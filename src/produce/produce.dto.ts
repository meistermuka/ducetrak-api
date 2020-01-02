import { PriceDto } from 'src/price/price.dto';

import { ApiProperty } from '@nestjs/swagger';

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
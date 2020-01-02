import { ApiProperty } from '@nestjs/swagger';

export class PriceDto {
    @ApiProperty()
    price: number;
    @ApiProperty()
    unit: string;
    @ApiProperty()
    produce: number;
    @ApiProperty()
    user: number;
}
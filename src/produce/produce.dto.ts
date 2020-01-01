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
}
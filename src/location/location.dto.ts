import { ApiProperty } from '@nestjs/swagger';

export class LocationDto {

    @ApiProperty()
    readonly name: string;
    @ApiProperty()
    readonly address: string;
    @ApiProperty()
    readonly coordinates: string;
    @ApiProperty()
    readonly user: number;
}
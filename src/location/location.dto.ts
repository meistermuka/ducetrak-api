import { ApiProperty } from "@nestjs/swagger";

export class CreateLocationDto {

    @ApiProperty()
    readonly name: string;
    @ApiProperty()
    readonly address: string;
    @ApiProperty()
    readonly coordinates: string;
    @ApiProperty()
    readonly user: number;
}
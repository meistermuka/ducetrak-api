import { ApiProperty } from '@nestjs/swagger';

export class TypeDto {

    @ApiProperty()
    readonly name: string;
}
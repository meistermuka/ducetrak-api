import { ApiProperty } from "@nestjs/swagger";

export class CreateTypeDto {

    @ApiProperty()
    readonly name: string;
}
import { Controller, Get } from '@nestjs/common';

@Controller('price')
export class PriceController {

    @Get()
    getPrices(): string {
        return 'Hello prices!';
    }
}

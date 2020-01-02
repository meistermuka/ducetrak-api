import { Body, Controller, Get } from '@nestjs/common';

@Controller('prices')
export class PriceController {

    @Get()
    getPrices(): string {
        return 'Hello prices!';
    }
}

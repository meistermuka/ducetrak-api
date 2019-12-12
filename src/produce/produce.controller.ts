import { Controller, Get } from '@nestjs/common';

@Controller('produce')
export class ProduceController {

    @Get()
    getProduce(): string {
        return 'Hello produce!';
    }
}

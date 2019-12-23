import { Controller, Get } from '@nestjs/common';

@Controller('configs')
export class ConfigController {

    @Get()
    getConfigs(): string[] {
        return [];
    }
}

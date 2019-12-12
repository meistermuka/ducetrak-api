import { Controller, Get } from '@nestjs/common';

@Controller('config')
export class ConfigController {

    @Get()
    getConfigs(): string[] {
        return [];
    }
}

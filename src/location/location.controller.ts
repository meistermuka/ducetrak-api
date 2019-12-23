import { Controller, Get } from '@nestjs/common';

@Controller('locations')
export class LocationController {

    @Get()
    getLocations(): string {
        return 'Hello Locations!';
    }
}

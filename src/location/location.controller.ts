import { Controller, Get } from '@nestjs/common';

@Controller('location')
export class LocationController {

    @Get()
    getLocations(): string {
        return 'Hello Locations!';
    }
}

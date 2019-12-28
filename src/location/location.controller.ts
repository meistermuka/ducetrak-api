import { Controller, Get, Post, Body, BadRequestException, Param, NotFoundException } from '@nestjs/common';
import { CreateLocationDto } from './location.dto';
import { LocationService } from './location.service';
import { Location } from './location.entity';
import { isEmpty } from 'lodash';

@Controller('locations')
export class LocationController {

    constructor(private locationService: LocationService​​) {}

    @Get()
    async getLocations(): Promise<Location[]> {
        return await this.locationService.getAllLocations();
    }

    @Get(':id')
    async getLocation(@Param('id') id: number): Promise<Location> {
        const loc =  await this.locationService.getLocation(id);
        if(isEmpty(loc)) {
            throw new NotFoundException();
        }
        return loc;
    }

    @Post()
    async postLocation(@Body() createLocationDto: CreateLocationDto​​): Promise<void> {
        try {
            await this.locationService.postLocation(createLocationDto);
        } catch (e) {
            throw new BadRequestException();
        }        
    }
}

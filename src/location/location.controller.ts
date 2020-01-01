import { isEmpty } from 'lodash';

import {
    BadRequestException, Body, Controller, Get, NotFoundException, Param, Post
} from '@nestjs/common';

import { LocationDto } from './location.dto';
import { Location } from './location.entity';
import { LocationService } from './location.service';

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
    async postLocation(@Body() locationDto: LocationDto​​): Promise<void> {
        try {
            await this.locationService.postLocation(locationDto);
        } catch (e) {
            throw new BadRequestException();
        }        
    }
}

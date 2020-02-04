import { isEmpty } from 'lodash';

import {
    BadRequestException, Body, Controller, Get, NotFoundException, Param, Post, Put, Delete
} from '@nestjs/common';

import { LocationDto } from './location.dto';
import { Location } from './location.entity';
import { LocationService } from './location.service';

@Controller('locations')
export class LocationController {

  constructor(private locationService: LocationService​​) {}

  private deleted = (loc: Location) => loc.isDeleted();

  @Get()
  async getLocations(): Promise<Location[]> {
    try {
      return await this.locationService.getAllLocations();
    } catch (err) {
      console.log(err);
      throw new BadRequestException();
    }
  }

  @Get(':id')
  async getLocation(@Param('id') id: number): Promise<Location> {
    try {
      return await this.locationService.getLocation(id);
    } catch (err) {
      console.log(err);
      throw new BadRequestException();
    }
  }

  @Put(':id')
  async updateLocation(@Param('id') id: number, @Body() locationDto: LocationDto): Promise<Location> {
    try {
      return await this.locationService.updateLocation(id, locationDto);
    } catch (err) {
      console.log(err);
      throw new BadRequestException();
    }
  }

  @Delete(':id')
  async deleteLocation(@Param('id') id: number): Promise<Location> {
    try {
      return await this.locationService.deleteLocation(id);
    } catch (err) {
      console.log(err);
      throw new BadRequestException();
    }
  }

  @Post()
  async postLocation(@Body() locationDto: LocationDto​​): Promise<Location> {
    try {
      return await this.locationService.postLocation(locationDto);
    } catch (err) {
      console.log(err);
      throw new BadRequestException();
    }
  }
}

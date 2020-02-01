import { isEmpty } from 'lodash';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../user/user.entity';
import { LocationDto } from './location.dto';
import { Location } from './location.entity';
import { NoUserFoundError, NoLocationFoundError } from '../shared';

@Injectable()
export class LocationService {

  constructor(
    @InjectRepository(Location) private readonly locationRepository: Repository<Location>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async getAllLocations(): Promise<Location[]> {
    return await this.locationRepository.find({ relations: ['user']});
  }

  async getLocation(id: number): Promise<Location> {
    return await this.locationRepository.findOne({ id }, { relations: ['user']});
  }

  async postLocation(locationDto: LocationDto​​): Promise<Location> {

    const location = new Location();
    location.name = locationDto.name;
    location.address = locationDto.address;
    location.coordinates = locationDto.coordinates;
    const user = await this.userRepository.findOne({ id: locationDto.user })

    if (isEmpty(user) || user.isDeleted()) {
        throw new NoUserFoundError();
    }
    location.user = user;
    return await this.locationRepository.save(location);
  }

  async updateLocation(id: number, locationDto: LocationDto): Promise<Location> {
    const location = await this.locationRepository.findOne({ id });

    if(location.isDeleted()) {
      throw new NoLocationFoundError();
    }
    location.name = locationDto.name;
    location.address = locationDto.address;
    location.coordinates = locationDto.coordinates;
    return await this.locationRepository.save(location);
  }

  async deleteLocation(id: number): Promise<void> {
    const location = await this.locationRepository.findOne({ id });
    if(location.isDeleted()) {
      throw new NoLocationFoundError('Location already deleted');
    }
    location.deleted = true;
    await this.locationRepository.save(location);
  }
}

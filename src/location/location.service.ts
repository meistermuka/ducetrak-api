import { isEmpty } from 'lodash';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../user/user.entity';
import { LocationDto } from './location.dto';
import { Location } from './location.entity';
import {
  NoUserFoundError, NoLocationFoundError, InvalidUpdateFieldsError
} from '../shared';
import { allDeleted } from '../shared/utils';


@Injectable()
export class LocationService {

  constructor(
    @InjectRepository(Location) private readonly locationRepository: Repository<Location>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  private filterUserRelation(location: Location): void {
    location.user = new User({
      id: location.user.id,
      firstName: location.user.firstName,
      lastName: location.user.lastName,
      userName: location.user.userName,
      email: location.user.email,
    });
  }

  async getAllLocations(): Promise<Location[]> {
    const locations = await this.locationRepository.find({ relations: ['user']});
    if(locations.every(allDeleted) || isEmpty(locations)) {
      throw new NoLocationFoundError('No Locations Found');
    }
    locations.map(location => this.filterUserRelation(location));
    return locations;
  }

  async getLocation(id: number): Promise<Location> {
    const location = await this.locationRepository.findOne({ id }, { relations: ['user']});
    this.filterUserRelation(location);
    return location;
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
    this.filterUserRelation(location);
    return await this.locationRepository.save(location);
  }

  async updateLocation(id: number, locationDto: LocationDto): Promise<Location> {
    const location = await this.locationRepository.findOne({ id }, { relations: ['user']});

    if(location.isDeleted() || isEmpty(location)) {
      throw new NoLocationFoundError();
    }

    const updateableFields = ['name', 'address', 'coordinates'];
    const locationDtoKeys = Object.keys(locationDto);
    const invalidFields = locationDtoKeys.filter(key => !updateableFields.includes(key));

    if(invalidFields.length) {
      throw new InvalidUpdateFieldsError(invalidFields);
    }

    Object.assign(location, locationDto);
    this.filterUserRelation(location);
    return await this.locationRepository.save(location);
  }

  async deleteLocation(id: number): Promise<Location> {
    const location = await this.locationRepository.findOne({ id });
    if(location.isDeleted()) {
      throw new NoLocationFoundError('Location already deleted');
    }
    location.deleted = true;
    return await this.locationRepository.save(location);
  }
}

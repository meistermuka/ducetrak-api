import { isEmpty } from 'lodash';

import { Injectable } from '@nestjs/common';

import { User } from '../user/user.entity';
import { LocationDto } from './location.dto';
import { Location } from './location.entity';

@Injectable()
export class LocationService {

    async getAllLocations(): Promise<Location[]> {
        return await Location.find({ relations: ['user']});
    }

    async getLocation(id: number): Promise<Location> {
        return await Location.findOne({ id, }, { relations: ['user']});
    }

    async postLocation(locationDto: LocationDto​​): Promise<void> {

        const location = new Location();
        location.name = locationDto.name;
        location.address = locationDto.address;
        location.coordinates = locationDto.coordinates;
        const user = await User.findOne({ id: locationDto.user });

        if (isEmpty(user)) {
            throw new Error('No User Found');
        }
        location.user = user;
        await location.save();
    }

    async updateLocation(id: number, locationDto: LocationDto): Promise<Location> {
      const location = await Location.findOne({ id });

      if(location.isDeleted()) {
        throw new Error('Location not found');
      }
      location.name = locationDto.name;
      location.address = locationDto.address;
      location.coordinates = locationDto.coordinates;
      await location.save();

      return location;
    }

    async deleteLocation(id: number): Promise<void> {
      const location = await Location.findOne({ id });
      if(location.isDeleted()) {
        throw new Error('Location already deleted');
      }
      location.deleted = true;
      await location.save();
    }
}

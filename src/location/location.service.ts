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
        location.save();
    }
}

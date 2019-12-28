import { Injectable } from '@nestjs/common';
import { CreateLocationDto } from './location.dto';
import { Location } from './location.entity';
import { User } from '../user/user.entity';
import { isEmpty } from 'lodash';

@Injectable()
export class LocationService {

    async getAllLocations(): Promise<Location[]> {
        return await Location.find({ relations: ['user']});
    }

    async getLocation(id: number): Promise<Location> {
        return await Location.findOne({ id, }, { relations: ['user']});
    }

    async postLocation(locationDto: CreateLocationDto​​): Promise<void> {

        const location = new Location();
        location.name = locationDto.name;
        location.address = locationDto.address;
        location.coordinates = locationDto.coordinates;
        const oneUser = await User.findOne({ id: locationDto.user });
        
        if (isEmpty(oneUser)) {
            throw new Error('No User Found');
        }
        location.user = oneUser;
        location.save();
    }
}

import { sha256 } from 'js-sha256';

import { Injectable } from '@nestjs/common';

import { Roles } from '../core/core.constants';
import { ConfigService } from '../core/services';
import { UserDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {

    constructor(private configService: ConfigService) { }

    async createUser(userDto: UserDto): Promise<void> {
        const user = new User();
        user.userName = userDto.username;
        user.firstName = userDto.firstName;
        user.lastName = userDto.lastName;
        user.email = userDto.email;
        //user.role = Roles.USER;
        user.createdDate = new Date().toISOString();
        user.password = this.hashPassword(userDto.password);

        await user.save();
    }

    async updateUser(): Promise<void> {}

    async deleteUser(): Promise<void> {}

    async loginUser(): Promise<void> {}

    async logoutUser(): Promise<void> {}

    private hashPassword(password: string): string {
        return sha256.hmac(this.configService.get('HMAC_KEY'), password);
    }
}

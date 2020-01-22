import { sha256 } from 'js-sha256';
import { isEmpty } from 'lodash';

import { Injectable } from '@nestjs/common';

import { Role } from '../core/entities/role.entity';
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
        user.createdDate = new Date().toISOString();
        user.password = this.hashPassword(userDto.password);

        const role = await Role.findOne({ id: userDto.role });
        if (isEmpty(role)) {
            throw new Error('No valid role found');
        }
        user.role = role;

        await user.save();
    }

    private async _getUser(userName: string): Promise<User> {
      const user = await User.find({ where: { userName, deleted: false }});
      if(isEmpty(user)) {
        throw new Error('No user found');
      }
      return user[0];
    }

    async getUser(userName: string): Promise<User> {
      return await this._getUser(userName);
    }

    async updateUser(): Promise<void> {}

    async deleteUser(userName: string): Promise<void> {
      const user = await this._getUser(userName);
      user.deleted = true;
      await user.save();

    }

    async loginUser(): Promise<void> {}

    async logoutUser(): Promise<void> {}

    private hashPassword(password: string): string {
        return sha256.hmac(this.configService.get('HMAC_KEY'), password);
    }
}

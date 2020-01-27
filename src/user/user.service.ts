import * as crypto from 'crypto';
import { isEmpty } from 'lodash';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';

import { Role } from '../core/entities/role.entity';
import { ConfigService } from '../core/services';
import { UserDto } from './user.dto';
import { User } from './user.entity';
import {
  UserExistsError, NoValidRoleError, NoUserFoundError, InvalidUpdateFieldsError
} from '../shared';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    private configService: ConfigService
  ) { }

  async createUser(userDto: UserDto): Promise<User> {

    const existingUser = await this.userRepository.findOne({ where: { userName: userDto.username }});
    if(!isEmpty(existingUser)) {
      throw new UserExistsError();
    }

    const createAndUpdateDate = new Date().toISOString();
    const user = new User({
      username: userDto.username,
      firstName: userDto.firstName,
      lastName: userDto.lastName,
      email: userDto.email,
      createdDate: createAndUpdateDate,
      updatedDate: createAndUpdateDate,
      password: this.hashPassword(userDto.password),
      role: await this._getUserRole(userDto.role),
    });
    return await this.userRepository.save(user);
  }

  private async _getUser(userName: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { userName }});
    if(isEmpty(user) || user.isDeleted()) {
      throw new NoUserFoundError();
    }
    return user;
  }

  private async _getUserRole(id: number): Promise<Role> {
    const role = await this.roleRepository.findOne({ id });

    if (isEmpty(role) || role.isDeleted()) {
      throw new NoValidRoleError();
    }

    return role;
  }

  async getUser(userName: string): Promise<User> {
    return await this._getUser(userName);
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find({relations: ['role']});
  }

  async updateUser(username: string, userDto: UserDto): Promise<User> {
    const user = await this._getUser(username);
    const updateableFields = ['firstName', 'lastName', 'email', 'password', 'role'];
    const userDtoKeys = Object.keys(userDto);
    const invalidFields = userDtoKeys.filter(key => !updateableFields.includes(key));

    if(invalidFields.length) {
      throw new InvalidUpdateFieldsError(invalidFields);
    }

    if(userDtoKeys.includes('password')) {
      userDto.password = this.hashPassword(userDto.password);
    }

    Object.assign(user, userDto);

    return await this.userRepository.save(user);
  }

  async deleteUser(userName: string): Promise<User> {
    const user = await this._getUser(userName);
    user.deleted = true;
    user.updatedDate = new Date().toISOString();
    return await this.userRepository.save(user);
  }

  private hashPassword(password: string): string {
    return crypto
          .createHmac('sha256', this.configService.get('HMAC_KEY'))
          .update(password)
          .digest('hex');
  }
}

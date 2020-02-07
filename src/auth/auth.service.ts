import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { ConfigService } from '../core/services/config/config.service';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.getUser(username);

    if(user && user.password == this.userService.hashPassword(password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.userName, sub: user.id };
    return {
      access_token: jwt.sign(payload, this.configService.get('TOKEN_SECRET'), {
        expiresIn: '300s',
        algorithm: 'HS256',
      })
    };
  }
}

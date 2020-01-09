import { Module } from '@nestjs/common';

import { ConfigService } from '../core/services';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [ConfigService, UserService]
})
export class UserModule {}

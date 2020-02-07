import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import { CoreModule } from '../core/core.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User as UserEntity } from './user.entity';
import { Role as RoleEntity } from '../core/entities/role.entity';

@Module({
  imports: [
    CoreModule,
    TypeOrmModule.forFeature([UserEntity, RoleEntity]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}

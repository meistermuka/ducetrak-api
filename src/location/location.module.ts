import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LocationController } from './location.controller';
import { LocationService } from './location.service';
import { Location as LocationEntity } from './location.entity';
import { User as UserEntity } from '../user/user.entity';

@Module({
  controllers: [LocationController],
  providers: [LocationService],
  imports: [
    TypeOrmModule.forFeature([LocationEntity, UserEntity]),
  ]
})
export class LocationModule { }

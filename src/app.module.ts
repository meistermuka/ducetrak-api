import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProduceModule } from './produce/produce.module';
import { LocationModule } from './location/location.module';
import { UserModule } from './user/user.module';
import { PriceModule } from './price/price.module';
import { Produce as ProduceEntity } from './produce/produce.entity';
import { Location as LocationEntity } from './location/location.entity';
import { Price as PriceEntity } from './price/price.entity';
import { User as UserEntity } from './user/user.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5499,
    username: 'postgres',
    password: 'docker',
    database: 'ducetrak',
    entities: [ProduceEntity, LocationEntity, PriceEntity, UserEntity],
    synchronize: true,
  }), ProduceModule, LocationModule, UserModule, PriceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

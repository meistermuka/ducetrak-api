import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProduceModule } from './produce/produce.module';
import { LocationModule } from './location/location.module';
import { UserModule } from './user/user.module';
import { PriceModule } from './price/price.module';
import { CoreModule } from './core/core.module';
import { ConfigService } from './core/services/config/config.service';
@Module({
  imports: [TypeOrmModule.forRootAsync({
    imports: [CoreModule],
    inject: [ConfigService],
    useFactory: async (config: ConfigService) => (config.getTypeOrmConfig()),
  }), ProduceModule, LocationModule, UserModule, PriceModule, CoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

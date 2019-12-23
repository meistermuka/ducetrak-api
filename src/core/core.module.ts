import { Module } from '@nestjs/common';
import { ConfigService } from './services/config/config.service';
import { ConfigController } from './controllers/config/config.controller';
import { TerminusOptionsService } from './services/terminus-options/terminus-options.service';
import { TerminusModule } from '@nestjs/terminus';
import { TypeController } from './controllers/type/type.controller';
import { TypeService } from './services';

@Module({
  imports: [
    TerminusModule.forRootAsync({
      useClass: TerminusOptionsService,
    }),
  ],
  providers: [{
    provide: ConfigService,
    useValue: new ConfigService(`./env/${process.env.NODE_ENV || 'development'}.env`),
  }, TypeService],
  exports: [ConfigService],
  controllers: [ConfigController, TypeController],
})
export class CoreModule { }

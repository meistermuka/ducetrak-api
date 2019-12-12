import { Module } from '@nestjs/common';
import { ConfigService } from './services/config/config.service';
import { ConfigController } from './controllers/config/config.controller';
import { TerminusOptionsService } from './services/terminus-options/terminus-options.service';
import { TerminusModule } from '@nestjs/terminus';

@Module({
  imports: [
    TerminusModule.forRootAsync({
      useClass: TerminusOptionsService,
    }),
  ],
  providers: [{
    provide: ConfigService,
    useValue: new ConfigService(`./env/${process.env.NODE_ENV || 'development'}.env`),
  }],
  exports: [ConfigService],
  controllers: [ConfigController],
})
export class CoreModule { }

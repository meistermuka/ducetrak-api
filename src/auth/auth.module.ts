import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { CoreModule } from '../core/core.module';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [CoreModule, UserModule, PassportModule],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}

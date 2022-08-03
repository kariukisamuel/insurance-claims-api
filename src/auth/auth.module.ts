import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRegistrationModule } from 'src/user-registration/user-registration.module';
import { UserRegistrationService } from 'src/user-registration/user-registration.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Auth } from './entity/auth.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../common/envs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  providers: [AuthService,JwtStrategy,LocalStrategy],
  controllers: [AuthController],
  imports: [
    UserRegistrationModule,
    TypeOrmModule.forFeature([Auth]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '86400s' },
    }),
  ],
  exports: [AuthService]
})
export class AuthModule {}

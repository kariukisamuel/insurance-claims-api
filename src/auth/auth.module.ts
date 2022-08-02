import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRegistrationModule } from 'src/user-registration/user-registration.module';
import { UserRegistrationService } from 'src/user-registration/user-registration.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Auth } from './entity/auth.entity';

@Module({
   providers:[AuthService],
   controllers:[AuthController],
   imports:[UserRegistrationModule, TypeOrmModule.forFeature([Auth])]
})
export class AuthModule {}

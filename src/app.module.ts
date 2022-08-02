import { Module } from '@nestjs/common';
import { UserRegistrationModule } from './user-registration/user-registration.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRegistration } from './user-registration/entity/user-registration.entity';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { Auth } from './auth/entity/auth.entity';


@Module({
  imports: [UserRegistrationModule,TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'insurance-claims-app',
    entities: [UserRegistration,Auth],
    synchronize: true,
  }), AuthModule],
})
export class AppModule {} 

import { Module } from '@nestjs/common';
import { UserRegistrationModule } from './user-registration/user-registration.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRegistration } from './user-registration/entity/user-registration.entity';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { Auth } from './auth/entity/auth.entity';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    UserRegistrationModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'insurance-claims-app',
      entities: [UserRegistration, Auth],
      synchronize: true,
    }),
    AuthModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
  ],
})
export class AppModule {}

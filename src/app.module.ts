import { Module } from '@nestjs/common';
import { UserRegistrationModule } from './user-registration/user-registration.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRegistration } from './user-registration/entity/user-registration.entity';
import { AuthModule } from './auth/auth.module';
import { Auth } from './auth/entity/auth.entity';
import { ThrottlerModule } from '@nestjs/throttler';
import { ClaimsModule } from './claims/claims.module';
import { Claims } from './claims/entity/claims.entity';

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
      entities: [UserRegistration, Auth,Claims],
      synchronize: true,
    }),
    AuthModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    ClaimsModule,
  ],

})
export class AppModule {}

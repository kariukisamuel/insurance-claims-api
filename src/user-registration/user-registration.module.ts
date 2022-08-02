import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRegistration } from './entity/user-registration.entity';
import { UserRegistrationController } from './user-registration.controller';
import { UserRegistrationService } from './user-registration.service';

@Module({
    imports:[TypeOrmModule.forFeature([UserRegistration])],
    controllers:[UserRegistrationController],
    providers:[UserRegistrationService],
    exports:[UserRegistrationService]
})
export class UserRegistrationModule {}

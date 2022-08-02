import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserRegistrationDto } from './create-user-registration.dto';
import { UserRegistrationService } from './user-registration.service';

@ApiTags('User Registration')
@Controller('user-registration')
export class UserRegistrationController {
    constructor(private userRegistrationService: UserRegistrationService){}
    @Get()
    getRegisteredUser(){
        return this.userRegistrationService.get()
    }
    @Post()
    @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
    storeRegisteringUser(@Body() CreateUserRegistrationDto: CreateUserRegistrationDto){
        return this.userRegistrationService.create(CreateUserRegistrationDto)
    }

}

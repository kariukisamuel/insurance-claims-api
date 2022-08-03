import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { CreateUserRegistrationDto } from './create-user-registration.dto';
import { UserRegistrationService } from './user-registration.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('User Registration')
@Controller('user-registration')
export class UserRegistrationController {
    constructor(private userRegistrationService: UserRegistrationService){}
    @Get()
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get all users, its a protected api that need a bearer token' })
    @ApiResponse({ status: 200, description: 'The records has been successfully retrieved.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    @UseGuards(JwtAuthGuard)
    getRegisteredUser(){
        return this.userRegistrationService.get()
    }
    @Post()
    @ApiOperation({ summary: 'Used to register all the user details' })
    @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
    @ApiUnprocessableEntityResponse ({ description: 'Bad Request' })
    storeRegisteringUser(@Body() CreateUserRegistrationDto: CreateUserRegistrationDto){
        return this.userRegistrationService.create(CreateUserRegistrationDto)
    }

}

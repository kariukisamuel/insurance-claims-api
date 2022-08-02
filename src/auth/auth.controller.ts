import { Body, Controller, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthDTO } from './auth.dto';
import { AuthService } from './auth.service';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('approve/:userId')
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  approveUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.authService.approve(userId);
  }

  @Post('suspend/:userId')
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully suspended.',
  })
  suspend(@Param('userId', ParseIntPipe) userId: number) {
    return this.authService.suspend(userId);
  }

  @Post('reinstate/:userId')
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully reinstated.',
  })
  reinstate(@Param('userId', ParseIntPipe) userId: number) {
    return this.authService.reinstate(userId);
  }

  @Post('register')
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully registered.',
  })
  register(@Body() authDTO:AuthDTO){
    return this.authService.signUp(authDTO)
  }
}

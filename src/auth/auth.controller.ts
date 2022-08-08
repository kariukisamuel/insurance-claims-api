import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthDTO } from './auth.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginDTO } from './login.dto';
import { ResetPasswordDTO } from './reset-password.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('approve/:userId')
  @ApiOperation({
    summary:
      'Approve registered user, to use the system.Once approved the user will receieve an email with a set up credentials link where he will set up his password',
  })
  @ApiResponse({
    status: 204,
    description: 'The user has been successfully approved.',
  })
  approveUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.authService.approve(userId);
  }

  @Post('suspend/:userId')
  @ApiOperation({
    summary: 'Suspends user from using and login in to the system',
  })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully suspended.',
  })
  suspend(@Param('userId', ParseIntPipe) userId: number) {
    return this.authService.suspend(userId);
  }

  @Post('reinstate/:userId')
  @ApiOperation({
    summary: 'Approve the suspended user, to use the system.',
  })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully reinstated.',
  })
  reinstate(@Param('userId', ParseIntPipe) userId: number) {
    return this.authService.reinstate(userId);
  }

  @Post('set-up-system-credentials')
  @ApiOperation({
    summary:
      'Once a user receives the set up credentials link, he/she will set his or password using this api',
  })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully registered.',
  })
  register(@Body() authDTO: AuthDTO) {
    return this.authService.signUp(authDTO);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({
    summary:
      'Login to use the system.',
  })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully logged.',
  })
  login(@Body() loginDTO: LoginDTO) {
    return this.authService.login(loginDTO);
  }

  @Post('reset-password')
  @ApiOperation({
    summary:
      'Reset Password Via Email.',
  })
  resetPassword(@Body() resetPasswordDTO: ResetPasswordDTO ){
    return this.authService.resetPassword(resetPasswordDTO)
  }
  

}

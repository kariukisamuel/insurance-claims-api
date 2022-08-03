import {
  Body,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRegistrationService } from 'src/user-registration/user-registration.service';
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entity/auth.entity';
import { Repository } from 'typeorm';
import { AuthDTO } from './auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
    private userRegistration: UserRegistrationService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.authRepository.findOne({
      where: { business_email: username },
    });
    const isMatch = await bcrypt.compare(pass, user.password);
    if (user && isMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  async approve(id: number) {
    const user = await this.userRegistration.getUser(id);
    const register_token = uuidv4();
    const status = true;
    const { business_email, business_role } = user;
    let userDto = {
      business_email,
      business_role,
      register_token,
      status,
    };

    return this.authRepository.save(userDto);
  }

  async suspend(id: number) {
    const user = await this.authRepository.findOneBy({
      id: 1,
    });
    user.status = false;
    return this.authRepository.save(user);
  }

  async reinstate(id: number) {
    const user = await this.authRepository.findOneBy({
      id: 1,
    });
    user.status = true;
    return this.authRepository.save(user);
  }

  async signUp(@Body() authDTO: AuthDTO) {
    console.log(authDTO.password);
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(authDTO.password, saltOrRounds);
    authDTO.password = hash;
    const user = await this.authRepository.findOneBy({
      business_email: authDTO.business_email,
    });
    if (authDTO.register_token === user.register_token) {
      authDTO.register_token = null;
      return this.authRepository.update(user.id, authDTO);
    } else {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'The link has expired',
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }
}

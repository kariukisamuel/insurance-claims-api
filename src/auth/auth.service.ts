import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRegistrationService } from 'src/user-registration/user-registration.service';
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entity/auth.entity';
import { Repository } from 'typeorm';
import { AuthDTO } from './auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
    private userRegistration: UserRegistrationService,
  ) {}
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
    const saltOrRounds = await bcrypt.genSalt();
    const hash = await bcrypt.hash(authDTO.password, saltOrRounds);
    authDTO.password = hash;
    const user = await this.authRepository.findOneBy({
      business_email: authDTO.business_email,
    });
    if (authDTO.register_token === user.register_token) {
      authDTO.register_token = null;
      return this.authRepository.update(user.id, authDTO);
    } else {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'The link has expired',
      }, HttpStatus.FORBIDDEN)
    }
  }
}
